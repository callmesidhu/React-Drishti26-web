import { useEffect, useRef } from "react";

// ============================================================
// DistortionImage
// ------------------------------------------------------------
// Same family of effect as aether1.ai's hover distortion: instead
// of warping the image based on where the cursor is *right now*,
// we keep a small "trail" texture that the cursor paints into as
// it moves. That trail fades and drifts on its own each frame, so
// it keeps swirling for a moment after you stop moving — then we
// use that trail (not the raw cursor) to displace the image and
// split its RGB channels.
//
// This is a lighter approximation of a real fluid simulation (the
// full technique is an incompressible Navier–Stokes solver — many
// more render passes: advection, pressure, vorticity...). What's
// here keeps the two ingredients that actually read as "fluid":
//   1. Advection  — the trail is swept along by the cursor's own
//      velocity each frame, so it smears in the direction of motion
//      instead of just fading in place.
//   2. Decay       — the trail loses a little strength every frame,
//      so it settles back to flat once you stop moving.
// It skips the pressure-projection step real fluid sims use to stay
// physically incompressible — visually close, dramatically simpler.
//
// Two render passes run every frame:
//   A) "Trail" pass  — draws into a small offscreen texture, reading
//      its own previous frame back in (this back-and-forth between
//      two textures is called "ping-ponging").
//   B) "Composite" pass — draws the actual image to the visible
//      canvas, using the trail texture to displace it.
// ============================================================

// A full-screen quad (-1..1 on both axes) shared by both passes —
// it's the only geometry either shader needs.
const QUAD_VERTICES = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// ---- Pass A: update the trail ----
// Reads the previous trail, sweeps ("advects") it along the cursor's
// velocity, fades it slightly, then stamps a bit of fresh velocity
// in at the cursor's current position.
//
// The trail stores a *signed* 2D vector (which way pixels should be
// pushed) in its red/green channels. A texture can only hold 0..1,
// so we encode -1..1 as 0..1 with `* 0.5 + 0.5`, and decode it back
// with `* 2.0 - 1.0` wherever we read it.
const TRAIL_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_uv;

  uniform sampler2D u_prevTrail;
  uniform vec2 u_mouse;          // cursor position, uv space, 0..1
  uniform vec2 u_velocity;       // cursor movement this frame, uv space
  uniform float u_decay;         // fraction of the trail kept each frame
  uniform float u_advect;        // how far the trail is swept per frame
  uniform float u_radius;        // stamp size, uv space
  uniform float u_hoverStrength; // fades the whole effect in/out, 0..1

  void main() {
    // Look up the previous trail slightly upstream, in the direction
    // the cursor is moving — this is what makes it smear instead of
    // just sitting still and fading.
    vec2 sampleUv = v_uv - u_velocity * u_advect;
    vec2 previous = texture2D(u_prevTrail, sampleUv).rg * 2.0 - 1.0;
    vec2 decayed = previous * u_decay;

    // Add fresh velocity near the cursor, fading out over u_radius.
    float distanceToMouse = distance(v_uv, u_mouse);
    float falloff = smoothstep(u_radius, 0.0, distanceToMouse);
    vec2 direction = length(u_velocity) > 0.0001 ? normalize(u_velocity) : vec2(0.0);
    vec2 stamped = decayed + direction * falloff * u_hoverStrength;

    vec2 clamped = clamp(stamped, -1.0, 1.0);
    gl_FragColor = vec4(clamped * 0.5 + 0.5, 0.0, 1.0);
  }
`;

// ---- Pass B: draw the image, displaced by the trail ----
const COMPOSITE_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_uv;

  uniform sampler2D u_image;
  uniform sampler2D u_trail;
  uniform vec2 u_coverScale;   // object-fit: cover scale for the image
  uniform vec2 u_coverOffset;  // object-fit: cover offset for the image
  uniform float u_displaceAmount;
  uniform float u_aberrationAmount;

  void main() {
    vec2 trailVector = texture2D(u_trail, v_uv).rg * 2.0 - 1.0;

    // Map the canvas UV onto the image UV, the same way CSS
    // "object-fit: cover" crops an image to fill a box.
    vec2 imageUv = v_uv * u_coverScale + u_coverOffset;
    vec2 displacedUv = imageUv + trailVector * u_displaceAmount;

    // Split the color channels slightly along the trail's direction —
    // stronger where the trail is stronger. This little bit of
    // chromatic aberration is what sells the "liquid" feel.
    float strength = length(trailVector);
    vec2 direction = strength > 0.0001 ? trailVector / strength : vec2(0.0);
    float splitAmount = strength * u_aberrationAmount;

    float red   = texture2D(u_image, displacedUv + direction * splitAmount).r;
    float green = texture2D(u_image, displacedUv).g;
    float blue  = texture2D(u_image, displacedUv - direction * splitAmount).b;

    gl_FragColor = vec4(red, green, blue, 1.0);
  }
`;

// Linear interpolation: moves `current` a fraction (`amount`) of the
// way towards `target`. Run every frame on the mouse position, this
// is what turns raw mouse jumps into a soft, trailing motion.
function lerp(current, target, amount) {
  return current + (target - current) * amount;
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

// Binds `positionBuffer` to a program's `a_position` attribute. Both
// programs share the same buffer/quad, but each needs its own
// attribute location looked up (linking a program doesn't guarantee
// it lands on the same location as another program).
function bindQuadAttribute(gl, program, positionBuffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const location = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

// Creates a small offscreen texture + framebuffer pair to render
// into — one "slot" of the trail's ping-pong pair.
function createTrailTarget(gl, width, height) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  // "Neutral" for this texture is (0.5, 0.5) — the encoded zero
  // vector — not black, so clear to gray rather than the WebGL
  // default of transparent black.
  gl.viewport(0, 0, width, height);
  gl.clearColor(0.5, 0.5, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { texture, framebuffer };
}

// Works out the scale/offset needed to make the image's UVs behave
// like CSS "object-fit: cover" — fill the canvas without stretching,
// cropping whichever axis overflows.
function getCoverTransform(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  const canvasRatio = canvasWidth / canvasHeight;
  const imageRatio = imageWidth / imageHeight;

  if (canvasRatio > imageRatio) {
    const scaleY = imageRatio / canvasRatio;
    return { scaleX: 1, scaleY, offsetX: 0, offsetY: (1 - scaleY) / 2 };
  }

  const scaleX = canvasRatio / imageRatio;
  return { scaleX, scaleY: 1, offsetX: (1 - scaleX) / 2, offsetY: 0 };
}

// ---- Tunable feel of the effect — adjust these to taste ----
const TRAIL_RESOLUTION_SCALE = 0.15; // trail texture size, relative to canvas
const TRAIL_DECAY = 0.94;            // higher = trail lingers longer
const TRAIL_ADVECT = 0.6;            // higher = trail smears further per frame
const TRAIL_RADIUS = 0.12;           // how wide a stamp the cursor leaves
const DISPLACE_AMOUNT = 0.08;        // how far the trail pushes image pixels
const ABERRATION_AMOUNT = 0.06;      // how far the color channels split

function DistortionImage({ src, alt = "", className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // No WebGL support — bail out quietly. The plain <img> fallback
    // rendered below stays visible either way, so nothing breaks,
    // it just won't distort.
    if (!gl) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const trailProgram = createProgram(gl, VERTEX_SHADER_SOURCE, TRAIL_SHADER_SOURCE);
    const compositeProgram = createProgram(gl, VERTEX_SHADER_SOURCE, COMPOSITE_SHADER_SOURCE);
    if (!trailProgram || !compositeProgram) return undefined;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

    const trailUniforms = {
      prevTrail: gl.getUniformLocation(trailProgram, "u_prevTrail"),
      mouse: gl.getUniformLocation(trailProgram, "u_mouse"),
      velocity: gl.getUniformLocation(trailProgram, "u_velocity"),
      decay: gl.getUniformLocation(trailProgram, "u_decay"),
      advect: gl.getUniformLocation(trailProgram, "u_advect"),
      radius: gl.getUniformLocation(trailProgram, "u_radius"),
      hoverStrength: gl.getUniformLocation(trailProgram, "u_hoverStrength"),
    };

    const compositeUniforms = {
      image: gl.getUniformLocation(compositeProgram, "u_image"),
      trail: gl.getUniformLocation(compositeProgram, "u_trail"),
      coverScale: gl.getUniformLocation(compositeProgram, "u_coverScale"),
      coverOffset: gl.getUniformLocation(compositeProgram, "u_coverOffset"),
      displaceAmount: gl.getUniformLocation(compositeProgram, "u_displaceAmount"),
      aberrationAmount: gl.getUniformLocation(compositeProgram, "u_aberrationAmount"),
    };

    // ---- The image texture ----
    const imageTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let coverTransform = { scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 };
    let imageIsLoaded = false;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      coverTransform = getCoverTransform(
        canvas.width, canvas.height, image.naturalWidth, image.naturalHeight
      );
      imageIsLoaded = true;
    };

    // ---- The trail's ping-pong pair ----
    // Each frame we render into whichever one *isn't* current, then
    // swap. `current` is always the one holding this frame's result.
    let trailTargets = null;

    function createTrailTargets() {
      const width = Math.max(1, Math.round(canvas.width * TRAIL_RESOLUTION_SCALE));
      const height = Math.max(1, Math.round(canvas.height * TRAIL_RESOLUTION_SCALE));
      return {
        width,
        height,
        current: createTrailTarget(gl, width, height),
        previous: createTrailTarget(gl, width, height),
      };
    }

    // ---- Mouse tracking state ----
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const previousSmoothMouse = { x: 0.5, y: 0.5 };
    let hoverStrength = 0;
    let hoverTarget = 0;

    function updateTargetMouse(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = (clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (clientY - rect.top) / rect.height;
    }

    function handlePointerMove(event) {
      updateTargetMouse(event.clientX, event.clientY);
      hoverTarget = 1;
    }

    function handlePointerLeave() {
      hoverTarget = 0;
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerenter", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    // ---- Keep the canvas' pixel size matched to its CSS size ----
    function resizeCanvasToDisplaySize() {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(canvas.clientWidth * devicePixelRatio);
      const displayHeight = Math.round(canvas.clientHeight * devicePixelRatio);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        if (imageIsLoaded) {
          coverTransform = getCoverTransform(
            canvas.width, canvas.height, image.naturalWidth, image.naturalHeight
          );
        }

        // The trail is intentionally low-res and relative to canvas
        // size, so a resize means starting it fresh at the new size.
        trailTargets = createTrailTargets();
      }
    }

    const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
    resizeObserver.observe(canvas);
    resizeCanvasToDisplaySize();

    // ---- Render loop ----
    let animationFrameId;

    function updateTrail(velocityX, velocityY, strength) {
      const { current, previous, width, height } = trailTargets;

      gl.bindFramebuffer(gl.FRAMEBUFFER, current.framebuffer);
      gl.viewport(0, 0, width, height);
      gl.useProgram(trailProgram);
      bindQuadAttribute(gl, trailProgram, positionBuffer);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, previous.texture);
      gl.uniform1i(trailUniforms.prevTrail, 0);

      gl.uniform2f(trailUniforms.mouse, smoothMouse.x, smoothMouse.y);
      gl.uniform2f(trailUniforms.velocity, velocityX, velocityY);
      gl.uniform1f(trailUniforms.decay, TRAIL_DECAY);
      gl.uniform1f(trailUniforms.advect, TRAIL_ADVECT);
      gl.uniform1f(trailUniforms.radius, TRAIL_RADIUS);
      gl.uniform1f(trailUniforms.hoverStrength, strength);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // What we just wrote becomes "current" for the composite pass;
      // next frame it becomes the "previous" to read from.
      trailTargets.current = previous;
      trailTargets.previous = current;
    }

    function drawComposite() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(compositeProgram);
      bindQuadAttribute(gl, compositeProgram, positionBuffer);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imageTexture);
      gl.uniform1i(compositeUniforms.image, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trailTargets.previous.texture);
      gl.uniform1i(compositeUniforms.trail, 1);

      gl.uniform2f(compositeUniforms.coverScale, coverTransform.scaleX, coverTransform.scaleY);
      gl.uniform2f(compositeUniforms.coverOffset, coverTransform.offsetX, coverTransform.offsetY);
      gl.uniform1f(compositeUniforms.displaceAmount, DISPLACE_AMOUNT);
      gl.uniform1f(compositeUniforms.aberrationAmount, ABERRATION_AMOUNT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame);
      if (!imageIsLoaded || !trailTargets) return;

      smoothMouse.x = lerp(smoothMouse.x, targetMouse.x, 0.15);
      smoothMouse.y = lerp(smoothMouse.y, targetMouse.y, 0.15);

      const velocityX = smoothMouse.x - previousSmoothMouse.x;
      const velocityY = smoothMouse.y - previousSmoothMouse.y;
      previousSmoothMouse.x = smoothMouse.x;
      previousSmoothMouse.y = smoothMouse.y;

      hoverStrength = lerp(hoverStrength, hoverTarget, 0.08);
      const strength = prefersReducedMotion ? 0 : hoverStrength;

      updateTrail(velocityX, velocityY, strength);
      drawComposite();
    }

    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerenter", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      gl.deleteTexture(imageTexture);
      gl.deleteProgram(trailProgram);
      gl.deleteProgram(compositeProgram);
      gl.deleteBuffer(positionBuffer);
      if (trailTargets) {
        gl.deleteTexture(trailTargets.current.texture);
        gl.deleteTexture(trailTargets.previous.texture);
        gl.deleteFramebuffer(trailTargets.current.framebuffer);
        gl.deleteFramebuffer(trailTargets.previous.framebuffer);
      }
    };
  }, [src]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Plain <img> fallback: rendered underneath by default, and
          stays the only visible thing if WebGL isn't available.
          Once the canvas starts drawing opaque frames, it covers
          this completely — so there's no visible swap either way. */}
      <img
        src={src}
        alt={alt}
        aria-hidden={alt === "" ? "true" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default DistortionImage;
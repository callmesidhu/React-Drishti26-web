import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

const EMBLEM_MODEL_PATH = "/home/drishti.glb";

function EmblemModel({ onReady }) {
  const { scene } = useGLTF(EMBLEM_MODEL_PATH);
  const groupRef = useRef(null);

  useEffect(() => {
    if (groupRef.current) {
      onReady(groupRef.current);
    }
    // Nothing to animate here — this component only loads and exposes the
    // model. Whatever renders it owns all entrance/rotation timing, so it
    // can be sequenced against other page content (see Home.jsx).
  }, [onReady]);

  return <primitive ref={groupRef} object={scene} />;
}

/**
 * Renders the emblem GLB and hands the loaded THREE.Group up via
 * `onModelReady` as soon as it's available. Deliberately does not animate
 * anything itself — the caller controls scale/opacity/rotation so this
 * model's motion can be sequenced against surrounding page content (e.g.
 * "don't reveal the text until the model's intro+rotation is done").
 */
function IdeasEmblem3D({ className = "", onModelReady }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
        <ambientLight intensity={0.4} color="#fff3d6" />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#ffd88a" />
        <directionalLight position={[-3, -2, -2]} intensity={0.3} color="#8a6a1f" />
        <Suspense fallback={null}>
          <EmblemModel onReady={onModelReady} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(EMBLEM_MODEL_PATH);

export default IdeasEmblem3D;
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridDistortion from "./GridDistortion";

gsap.registerPlugin(ScrollTrigger);

const heroBg = "/home/drishti-take-1.webp";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";

// Lower grid density on touch/coarse-pointer devices — the per-frame cost
// of this effect is roughly O(grid^2) in plain JS (not just GPU work), so
// this meaningfully reduces CPU cost on phones, not just visual fidelity.
const isCoarsePointer =
 typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const DISTORTION_GRID = isCoarsePointer ? 24 : 64;
const DISTORTION_MOUSE_SIZE = 0.07;
const DISTORTION_STRENGTH = isCoarsePointer ? 0.1 : 0.15;
const NOISE_BACKGROUND =
 "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const splitText = (text, ref) => {
 if (!ref.current) return [];
 ref.current.innerHTML = "";
 const chars = [];
 text.split("").forEach((char) => {
 const span = document.createElement("span");
 span.textContent = char === " " ? "\u00A0" : char;
 span.style.display = "inline-block";
 span.style.opacity = "0";
 ref.current.appendChild(span);
 chars.push(span);
 });
 return chars;
};

const createParticles = (container, count, colors) => {
 if (!container) return [];
 container.innerHTML = "";
 const particles = [];
 for (let i = 0; i < count; i++) {
 const particle = document.createElement("div");
 particle.className = "absolute rounded-full pointer-events-none";
 const size = Math.random() * 4 + 2;
 const color = colors[Math.floor(Math.random() * colors.length)];
 particle.style.width = `${size}px`;
 particle.style.height = `${size}px`;
 particle.style.backgroundColor = color;
 particle.style.left = `${Math.random() * 100}%`;
 particle.style.top = `${Math.random() * 100}%`;
 particle.style.opacity = "0";
 container.appendChild(particle);
 particles.push(particle);
 }
 return particles;
};

export default function Hero() {
 const heroBgRef = useRef(null);
 const heroLeftTextRef = useRef(null);
 const heroRightTextRef = useRef(null);
 const heroLine1Ref = useRef(null);
 const heroLine2Ref = useRef(null);
 const heroTitleRef = useRef(null);
 const heroParticlesRef = useRef(null);
 const heroSectionRef = useRef(null);

 useEffect(() => {
 const ctx = gsap.context(() => {
 // Hero entrance
 gsap.fromTo(
 heroBgRef.current,
 { opacity: 0 },
 { opacity: 1, duration: 1.2, ease: "power2.out" }
 );

 gsap.fromTo(
 heroLeftTextRef.current,
 { x: -40, opacity: 0 },
 { x: 0, opacity: 0.7, duration: 1, delay: 0.3, ease: "power3.out" }
 );

 gsap.fromTo(
 heroRightTextRef.current,
 { x: 40, opacity: 0 },
 { x: 0, opacity: 0.7, duration: 1, delay: 0.3, ease: "power3.out" }
 );

 gsap.fromTo(
 heroLine1Ref.current,
 { scaleX: 0, transformOrigin: "left center", opacity: 0 },
 { scaleX: 1, opacity: 0.6, duration: 1, delay: 0.5, ease: "power3.out" }
 );

 gsap.fromTo(
 heroLine2Ref.current,
 { scaleX: 0, transformOrigin: "right center", opacity: 0 },
 { scaleX: 1, opacity: 0.6, duration: 1, delay: 0.5, ease: "power3.out" }
 );

 const heroChars = splitText("DRISHTI", heroTitleRef);
 gsap.fromTo(
 heroChars,
 { y: 50, opacity: 0 },
 { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, delay: 0.2, ease: "power3.out" }
 );

 // --- Particles in Hero ---
 const heroParticles = createParticles(heroParticlesRef.current, 40, ["#D4AF37", "#ffffff", "#ffd700"]);
 heroParticles.forEach((particle) => {
 gsap.fromTo(
 particle,
 { opacity: 0, scale: 0, y: 50 },
 { opacity: Math.random() * 0.7 + 0.2, scale: 1, y: 0, duration: Math.random() * 1.5 + 0.5, delay: Math.random() * 1.5 + 0.5, ease: "back.out(2)" }
 );
 gsap.to(particle, {
 y: `${(Math.random() - 0.5) * 250}`,
 x: `${(Math.random() - 0.5) * 150}`,
 duration: Math.random() * 8 + 8,
 repeat: -1,
 yoyo: true,
 ease: "sine.inOut",
 });
 });

 // --- Fast Upward Text & Particle Parallax on Scroll ---
 const heroSection = heroSectionRef.current;
 if (heroSection) {
 // DRISHTI title moves up fast on scroll
 gsap.to(heroTitleRef.current, {
 y: -260,
 ease: "none",
 scrollTrigger: {
 trigger: heroSection,
 start: "top top",
 end: "bottom top",
 scrub: true,
 },
 });

 // Left text ("Fest unlike any other") and line move up fast on scroll
 gsap.to([heroLeftTextRef.current, heroLine1Ref.current], {
 y: -220,
 ease: "none",
 scrollTrigger: {
 trigger: heroSection,
 start: "top top",
 end: "bottom top",
 scrub: true,
 },
 });

 // Right text ("Rewind and rejoice") and line move up fast on scroll
 gsap.to([heroRightTextRef.current, heroLine2Ref.current], {
 y: -220,
 ease: "none",
 scrollTrigger: {
 trigger: heroSection,
 start: "top top",
 end: "bottom top",
 scrub: true,
 },
 });

 // Particles float up on scroll
 gsap.to(heroParticlesRef.current, {
 yPercent: -50,
 ease: "none",
 scrollTrigger: {
 trigger: heroSection,
 start: "top top",
 end: "bottom top",
 scrub: true,
 },
 });
 }
 });

 return () => ctx.revert();
 }, []);

 return (
 <section
 ref={heroSectionRef}
 className="relative h-[100svh] max-h-[1024px] min-h-[560px] w-full overflow-hidden bg-black"
 aria-labelledby="drishti-title"
 >
 <div ref={heroBgRef} className="absolute inset-0 opacity-0">
 <GridDistortion
 imageSrc={heroBg}
 grid={DISTORTION_GRID}
 mouse={DISTORTION_MOUSE_SIZE}
 strength={DISTORTION_STRENGTH}
 relaxation={0.9}
 className="h-full w-full"
 />
 </div>

 {/* Visual noise/grain, purely decorative */}
 <div
 className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay"
 style={{ backgroundImage: NOISE_BACKGROUND }}
 aria-hidden="true"
 />

 {/* Floating particles */}
 <div ref={heroParticlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10" />

 {/* Left tagline & line */}
 <div className="absolute left-[clamp(20px,3.5vw,50px)] top-[35%] md:top-[48%] -translate-y-1/2 z-20 flex flex-col items-start gap-2">
 <div
 ref={heroLeftTextRef}
 className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,15px)] font-normal leading-[normal] tracking-[0.5px] text-white opacity-0 whitespace-nowrap"
 >
 FEST UNLIKE ANY OTHER
 </div>
 <img
 ref={heroLine1Ref}
 className="hidden md:block h-0.5 w-[clamp(160px,22vw,320px)] opacity-0"
 alt=""
 aria-hidden="true"
 src={heroLine1}
 />
 </div>

 {/* Right tagline & line */}
 <div className="absolute right-[clamp(20px,3.5vw,50px)] top-[35%] md:top-[48%] -translate-y-1/2 z-20 flex flex-col items-end gap-2">
 <div
 ref={heroRightTextRef}
 className="text-right font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,15px)] font-normal leading-[normal] tracking-[0.5px] text-white opacity-0 whitespace-nowrap"
 >
 REWIND AND REJOICE
 </div>
 <img
 ref={heroLine2Ref}
 className="hidden md:block h-0.5 w-[clamp(160px,22vw,320px)] opacity-0"
 alt=""
 aria-hidden="true"
 src={heroLine2}
 />
 </div>

 {/* Centered DRISHTI Title */}
 <h1
 ref={heroTitleRef}
 id="drishti-title"
 className="absolute bottom-40 md:bottom-10 left-0 w-full text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(64px,13vw,190px)] font-normal leading-none tracking-[0] text-white z-20 pointer-events-none"
 >
 </h1>
 </section>
 );
}
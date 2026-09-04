import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coreValues = ["INNOVATION", "FUTURE", "COLLABORATION", "EXCELLANCE", "LEGACY"];
const TOTAL_LOGO_FRAMES = 150;
const FRAME_PRELOAD_WINDOW = 12;

const getLogoFramePath = (frameIndex) =>
 `/3dlogo/ezgif-frame-${String(frameIndex).padStart(3, '0')}.webp`;

export default function Ideas() {
 const [activeCoreValueIndex, setActiveCoreValueIndex] = useState(0);

 const ideasSectionRef = useRef(null);
 const ideasContainerRef = useRef(null);
 const ideasEmblemWrapperRef = useRef(null);
 const ideasLineFillRef = useRef(null);
 const ideasImageRef = useRef(null);
 const ideasTitleRef = useRef(null);
 const ideasParagraphRef = useRef(null);
 const ideasRightTextRef = useRef(null);
 const coreValuesRef = useRef([]);
 const ideasVectorLineRef = useRef(null);
 const mobileCoreWrapperRef = useRef(null);
 const logoFrameCacheRef = useRef({});

 const ensureLogoFrameLoaded = (frameIndex) => {
 const safeIndex = Math.max(1, Math.min(TOTAL_LOGO_FRAMES, frameIndex));

 if (logoFrameCacheRef.current[safeIndex]) {
 return logoFrameCacheRef.current[safeIndex];
 }

 const image = new Image();
 image.decoding = "async";
 image.loading = "eager";
 image.src = getLogoFramePath(safeIndex);
 logoFrameCacheRef.current[safeIndex] = image;

 return image;
 };

 const preloadLogoFrameRange = (frameIndex) => {
 const safeIndex = Math.max(1, Math.min(TOTAL_LOGO_FRAMES, frameIndex));
 const start = Math.max(1, safeIndex - FRAME_PRELOAD_WINDOW);
 const end = Math.min(TOTAL_LOGO_FRAMES, safeIndex + FRAME_PRELOAD_WINDOW);

 for (let i = start; i <= end; i += 1) {
 ensureLogoFrameLoaded(i);
 }
 };

 const handleCoreValueClick = (index) => {
 setActiveCoreValueIndex(index);
 const section = ideasSectionRef.current;
 if (!section) return;
 const st = ScrollTrigger.getAll().find((s) => s.vars?.id === "ideas-scroll-trigger" || s.trigger === section);
 if (st) {
 const targetScroll = st.start + (st.end - st.start) * (index / (coreValues.length - 1));
 if (window.lenis) {
 window.lenis.scrollTo(targetScroll, { duration: 1.2 });
 } else {
 window.scrollTo({ top: targetScroll, behavior: "smooth" });
 }
 }
 };

 const handleEmblemMouseMove = (e) => {
 if (!ideasEmblemWrapperRef.current) return;
 const rect = e.currentTarget.getBoundingClientRect();
 const x = (e.clientX - rect.left) / rect.width - 0.5;
 const y = (e.clientY - rect.top) / rect.height - 0.5;
 gsap.to(ideasEmblemWrapperRef.current, {
 rotateY: x * 18,
 rotateX: -y * 18,
 duration: 0.5,
 ease: "power2.out",
 });
 };

 const handleEmblemMouseLeave = () => {
 if (!ideasEmblemWrapperRef.current) return;
 gsap.to(ideasEmblemWrapperRef.current, {
 rotateY: 0,
 rotateX: 0,
 duration: 0.8,
 ease: "power2.out",
 });
 };

 useEffect(() => {
 const section = ideasSectionRef.current;
 const img = ideasImageRef.current;
 if (!section || !img) return undefined;

 const setFrame = (frameIndex) => {
 const safeIndex = Math.max(1, Math.min(TOTAL_LOGO_FRAMES, frameIndex));
 const currentFrame = Number(img.dataset.frame || 0);

 if (currentFrame !== safeIndex) {
 const cachedFrame = ensureLogoFrameLoaded(safeIndex);
 img.src = cachedFrame.src || getLogoFramePath(safeIndex);
 img.dataset.frame = String(safeIndex);
 }

 preloadLogoFrameRange(safeIndex);
 };

 const initialLoad = () => {
 setFrame(1);
 };

 const observer = new IntersectionObserver(
 (entries) => {
 if (entries[0]?.isIntersecting) {
 initialLoad();
 observer.disconnect();
 }
 },
 { rootMargin: "200px" }
 );
 observer.observe(section);

 const ctx = gsap.context(() => {
 const lineFill = ideasLineFillRef.current;
 const title = ideasTitleRef.current;
 const paragraph = ideasParagraphRef.current;
 const emblem = ideasEmblemWrapperRef.current;
 const coreEls = coreValuesRef.current;
 const rightText = ideasRightTextRef.current;
 const vectorLine = ideasVectorLineRef.current;
 const mobileCoreWrapper = mobileCoreWrapperRef.current;

 const tl = gsap.timeline({
 scrollTrigger: {
 id: "ideas-scroll-trigger",
 trigger: section,
 start: "top top",
 end: "+=180%",
 pin: true,
 pinSpacing: true,
 scrub: 0.5,
 anticipatePin: 1,
 onUpdate: (self) => {
 const p = self.progress;
 const frameIndex = Math.max(1, Math.min(TOTAL_LOGO_FRAMES, Math.round(p * (TOTAL_LOGO_FRAMES - 1)) + 1));

 setFrame(frameIndex);

 const idx = Math.min(coreValues.length - 1, Math.floor(p * coreValues.length));
 setActiveCoreValueIndex(idx);
 },
 },
 });

 // Emblem starts very large and slightly shifted down (to center it on desktop), scales and moves to its final position
 tl.fromTo(
 emblem,
 { scale: 2.5, opacity: 1, y: window.innerWidth < 768 ? 0 : "10vh" },
 { scale: 1, opacity: 1, y: 0, ease: "power2.inOut", duration: 0.35 },
 0.46 // starts at ~frame 70
 );

 // Text elements start invisible and fade in slightly after scaling begins
 tl.fromTo(
 coreEls,
 { x: -25, opacity: 0 },
 { x: 0, opacity: 0.6, stagger: 0.04, duration: 0.25, ease: "power2.out" },
 0.56
 );

 if (mobileCoreWrapper) {
 tl.fromTo(
 mobileCoreWrapper,
 { y: -15, opacity: 0 },
 { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
 0.56
 );
 }

 if (rightText) {
 tl.fromTo(
 rightText,
 { x: 25, opacity: 0 },
 { x: 0, opacity: 0.4, duration: 0.25, ease: "power2.out" },
 0.56
 );
 }

 if (vectorLine) {
 tl.fromTo(
 vectorLine,
 { opacity: 0 },
 { opacity: 1, ease: "power2.out", duration: 0.25 },
 0.56
 );
 }

 tl.fromTo(
 title,
 { opacity: 0, y: 25 },
 { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
 0.56
 );

 if (paragraph) {
 tl.fromTo(
 paragraph,
 { opacity: 0, y: 15 },
 { opacity: 0.75, y: 0, ease: "power2.out", duration: 0.35 },
 0.56
 );
 }

 if (lineFill) {
 tl.fromTo(
 lineFill,
 { height: "0%" },
 { height: "100%", ease: "none", duration: 0.44 },
 0.56
 );
 }
 }, section);

 return () => {
 observer.disconnect();
 ctx.revert();
 };
 }, []);

 return (
 <section
 ref={ideasSectionRef}
 className="relative h-[100svh] min-h-[600px] max-h-[1080px] w-full overflow-hidden bg-black flex flex-col items-center justify-between py-6 md:py-10 z-20"
 aria-labelledby="hero-title"
 >
 <div className="relative w-full max-w-[1440px] h-full flex flex-col justify-center md:justify-between items-center px-4 sm:px-8 md:px-12 z-10 gap-10 md:gap-0">
 
 {/* Top / Center Composition: Left Core Values, Center Emblem, Right Details */}
 <div 
 ref={ideasContainerRef}
 className="w-full md:flex-1 flex flex-col md:flex-row items-center justify-center relative md:my-auto py-2 gap-10 md:gap-0"
 >
 {/* Left Column: Core Values & Glowing Progress Line (Desktop) */}
 <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-[2%] lg:left-[5%] top-1/2 -translate-y-1/2 z-20">
 <ul className="m-0 flex flex-col items-start gap-4 lg:gap-5 p-0 list-none" aria-label="Core values">
 {coreValues.map((value, index) => {
 const isActive = activeCoreValueIndex === index;
 return (
 <li
 key={value}
 ref={(el) => { coreValuesRef.current[index] = el }}
 onClick={() => handleCoreValueClick(index)}
 className="group flex items-center gap-3 cursor-pointer transition-all duration-300 select-none"
 >
 {/* Glowing indicator pill */}
 <span
 className={`inline-block h-1.5 rounded-full transition-all duration-300 ${
 isActive
 ? "w-5 bg-[#D4AF37] "
 : "w-1.5 bg-white/20 group-hover:bg-white/50"
 }`}
 />
 <span
 className={`font-['Space_Grotesk-Regular',Helvetica] text-[clamp(12px,1.2vw,17px)] font-medium tracking-[0.15em] transition-all duration-300 ${
 isActive
 ? "text-[#D4AF37] scale-105 "
 : "text-white/40 group-hover:text-white/75"
 }`}
 >
 {value}
 </span>
 </li>
 );
 })}
 </ul>

 {/* Vertical Laser Divider Line */}
 <div 
 ref={ideasVectorLineRef}
 className="h-[clamp(180px,26vh,260px)] w-[1.5px] bg-white/15 relative overflow-hidden rounded-full ml-2"
 >
 <div 
 ref={ideasLineFillRef}
 className="w-full bg-gradient-to-b from-[#B78000] via-[#FFDB86] to-[#D4AF37] rounded-full"
 style={{ height: "0%" }}
 />
 </div>
 </div>

 {/* Center Emblem with Interactive Mouse Parallax */}
 <div
 className="relative flex items-center justify-center [perspective:1000px]"
 onMouseMove={handleEmblemMouseMove}
 onMouseLeave={handleEmblemMouseLeave}
 >
 <div
 ref={ideasEmblemWrapperRef}
 className="relative w-[65vw] md:w-[clamp(280px,36vw,500px)] aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
 >
 <img
 ref={ideasImageRef}
 className="w-full h-full object-contain pointer-events-none select-none mix-blend-screen opacity-100"
 src="/3dlogo/ezgif-frame-001.webp"
 alt="Drishti Emblem"
 />
 </div>
 </div>

 {/* Right Column: Festival Emblem Badge / Coordinates (Desktop Balance) */}
 <div 
 ref={ideasRightTextRef}
 className="hidden lg:flex flex-col items-end gap-1.5 absolute right-[3%] lg:right-[6%] top-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-40 font-mono text-[11px] tracking-widest text-white/70"
 >
 <span className="text-[#D4AF37]/80 font-bold">DRISHTI // 2026</span>
 <span>10° 32&apos; N, 76° 13&apos; E</span>
 <span className="text-[10px] text-white/40 mt-2">SCROLL TO REVEAL</span>
 </div>
 </div>

 {/* Bottom Title & Narrative */}
 <div className="w-full flex flex-col items-center justify-center text-center gap-2 md:gap-3 z-10 md:mt-auto pb-2">
 <h2
 ref={ideasTitleRef}
 id="hero-title"
 className="w-full max-w-[1100px] text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(28px,4.8vw,76px)] font-normal leading-[1.05] tracking-[0.01em] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] select-none uppercase"
 >
 IDEAS DON&apos;T ASK PERMISSION
 </h2>

 <p
 ref={ideasParagraphRef}
 className="w-full max-w-[760px] text-center font-['Space_Grotesk-Regular',Helvetica] text-[clamp(12px,1.1vw,16px)] font-normal leading-[1.45] tracking-[0.02em] text-white/60 px-4 select-none"
 >
 Where bold imagination breaks through boundaries. Witness the clash of intellect, artistry, and engineering prowess at Drishti 2026.
 </p>
 </div>

 </div>
 </section>
 );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aftermovieVideo = "/home/date-reveal.webm";
const aftermovieLogo = "/home/aftermovie-logo.png";

export default function Aftermovie() {
 const aftermovieSectionRef = useRef(null);
 const aftermovieContainerRef = useRef(null);
 const aftermovieLogoRef = useRef(null);
 const aftermovieGridRef = useRef(null);
 const aftermovieVideoRef = useRef(null);
 const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

 useEffect(() => {
  const section = aftermovieSectionRef.current;
  if (!section) return undefined;
  const observer = new IntersectionObserver(([entry]) => {
   if (!entry.isIntersecting) return;
   setShouldLoadVideo(true);
   observer.disconnect();
  }, { rootMargin: "300px 0px" });
  observer.observe(section);
  return () => observer.disconnect();
 }, []);

 useEffect(() => {
  if (shouldLoadVideo && aftermovieVideoRef.current) {
   aftermovieVideoRef.current.play().catch(() => {});
  }
 }, [shouldLoadVideo]);

 useEffect(() => {
  const ctx = gsap.context(() => {
   gsap.set(aftermovieContainerRef.current, { y: "100vh" });
   gsap.set(aftermovieVideoRef.current, { opacity: 1, scale: 1.08, yPercent: -15 });

   // 1. Extreme smooth parallax for background grid
   gsap.fromTo(
    aftermovieGridRef.current,
    { yPercent: -40 },
    {
     yPercent: 40,
     ease: "none",
     scrollTrigger: {
      trigger: aftermovieSectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
     },
    }
   );

   // 2. Entrance animation: Video container slides up to center as section enters viewport
   gsap.to(aftermovieContainerRef.current, {
    y: "0vh",
    ease: "power2.out",
    scrollTrigger: {
     trigger: aftermovieSectionRef.current,
     start: "top bottom",
     end: "top top",
     scrub: 0.8,
    },
   });

   // Video scales down slightly during entrance
   gsap.to(aftermovieVideoRef.current, {
    scale: 1,
    ease: "power2.out",
    scrollTrigger: {
     trigger: aftermovieSectionRef.current,
     start: "top bottom",
     end: "top top",
     scrub: 0.8,
    },
   });

   // 3. Pinned sequence: Section pins at top, video container slides up while next section chases it
   const pinTl = gsap.timeline({
    scrollTrigger: {
     trigger: aftermovieSectionRef.current,
     start: "top top",
     end: "+=100%", // Pin for exactly 1 viewport height
     pin: true,
     pinSpacing: false, // CRITICAL: Allows the next section to scroll up OVER this section immediately!
     scrub: 0.8,
    },
   });

   pinTl.to(aftermovieContainerRef.current, {
    y: "-100vh",
    ease: "none", // Linear ease so it perfectly matches the scroll speed of the next section
   });

   // 4. Continuous internal video parallax spanning the entire visibility
   gsap.to(aftermovieVideoRef.current, {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
     trigger: aftermovieSectionRef.current,
     start: "top bottom",
     end: "bottom top",
     scrub: true,
    },
   });
  });

  return () => ctx.revert();
 }, []);

 return (
  <section ref={aftermovieSectionRef} className="relative h-screen min-h-[700px] w-full bg-black flex items-center justify-center overflow-hidden">
   {/* Background Image */}
   <img 
    ref={aftermovieGridRef}
    src="/home/damu.webp"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-50"
    loading="lazy"
    decoding="async"
    style={{
     maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
     WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
    }}
   />

   <div className="relative w-[92%] md:w-[84%] lg:w-[100%] max-w-[1050px] flex flex-col items-center justify-center px-[clamp(10px,2vw,24px)] z-10">
    <div ref={aftermovieContainerRef} className="relative w-full aspect-[1415/850] overflow-hidden rounded-none p-[1px] md:p-[2px] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)]">
     <div className="relative w-full h-full flex flex-col justify-end bg-black rounded-none overflow-hidden">
      <video
       ref={aftermovieVideoRef}
       className="absolute left-0 top-[-15%] h-[130%] w-full object-cover"
       src={aftermovieVideo}
       autoPlay
       muted
       loop
       playsInline
       preload="metadata"
       aria-label="Drishti date reveal"
       style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
       }}
      />
      <div className="relative z-10 w-full flex flex-col border-t border-white/50 pt-[clamp(10px,1.8vw,22px)] pb-[clamp(10px,1.8vw,22px)] px-[clamp(16px,3vw,44px)] pointer-events-none">
       <div className="relative flex min-h-[clamp(30px,4.8vw,60px)] items-center justify-center">
        <img
         ref={aftermovieLogoRef}
         className="pointer-events-none h-[clamp(30px,3.8vw,46px)] w-auto object-cover"
         alt="Drishti"
         src={aftermovieLogo}
         loading="lazy"
         decoding="async"
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}

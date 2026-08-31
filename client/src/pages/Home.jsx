import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProShows from "./ProShows";
import EventDetailsModal from "../components/EventDetailsModal";
import DomeGallery from "../components/DomeGallery";
import { dakshaEventsData, competitionsData, workshopsData } from "../data/eventsData";

gsap.registerPlugin(ScrollTrigger);

const heroBg = "/home/drishti-take-1.png";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";
const categoriesPhoto = "/home/categories-photo.png";
const arrowDownRight = "/home/arrow-down-right.svg";
const aftermovieVideo = "/home/aftermovie.mp4";
const aftermovieLogo = "/home/aftermovie-logo.png";
const galleryImage1 = "/home/gallery-1.png";
const galleryImage2 = "/home/gallery-2.png";
const galleryImage3 = "/home/gallery-3.png";
const galleryImage4 = "/home/gallery-4.png";
const galleryImage5 = "/home/gallery-5.png";

// Static grain/noise texture — pure inline SVG, no external image request,
// so there's nothing here that can fail to load or hang.
const NOISE_BACKGROUND =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const coreValues = ["INNOVATION", "FUTURE", "COLLABORATION", "EXCELLANCE", "LEGACY"];



const featuredEvents = [
  dakshaEventsData[0],
  competitionsData[0],
  competitionsData[1],
  workshopsData[0],
];

const drishtiGalleryImages = [
  { src: galleryImage1, alt: "Drishti Festival Stage & Atmosphere" },
  { src: galleryImage2, alt: "Tech Innovation & Robotics" },
  { src: galleryImage3, alt: "Atmosphere & Future Tech" },
  { src: galleryImage4, alt: "Workshops & Tech Sessions" },
  { src: galleryImage5, alt: "Pro Shows Musical Night" },
  { src: categoriesPhoto, alt: "Drishti '26 Competitions" },
  { src: "/home/aftermovie-bg.png", alt: "Festival Lights & Crowds" },
  { src: "/home/featured-event-poster.png", alt: "Featured Events & Keynotes" },
  { src: "/proshow/proshowgrid.jpeg", alt: "Live Pro Shows Night" },
  { src: "/daksha/shark-tank.png", alt: "Daksha Ideation & Pitch" },
  { src: heroBg, alt: "Drishti '26 Horizon" },
];

function Home() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [carouselStep, setCarouselStep] = useState(412);
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [activeCoreValueIndex, setActiveCoreValueIndex] = useState(0);

  const carouselCardRef = useRef(null);
  const carouselContainerRef = useRef(null);

  // Refs for GSAP animations
  const heroBgRef = useRef(null);
  const heroLeftTextRef = useRef(null);
  const heroRightTextRef = useRef(null);
  const heroLine1Ref = useRef(null);
  const heroLine2Ref = useRef(null);
  const heroTitleRef = useRef(null);
  const heroParticlesRef = useRef(null);
  const heroSectionRef = useRef(null);
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
  const featuredHeadingRef = useRef(null);
  const featuredParagraphRef = useRef(null);
  const featuredCardsRef = useRef([]);
  const aftermovieSectionRef = useRef(null);
  const aftermovieContainerRef = useRef(null);
  const aftermovieTitleLeftRef = useRef(null);
  const aftermovieTitleRightRef = useRef(null);
  const aftermovieLogoRef = useRef(null);
  const aftermovieGridRef = useRef(null);

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



  useEffect(() => {
    if (!carouselCardRef.current || !carouselContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.borderBoxSize?.[0]?.inlineSize || entry.target.offsetWidth;
        setCarouselStep(width + 11);
      }
    });
    observer.observe(carouselCardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRegistration = (eventIndex) => {
    setActiveModalEvent(featuredEvents[eventIndex]);
    window.dispatchEvent(
      new CustomEvent("featured-event-registration", { detail: { eventIndex } })
    );
  };

  const moveFeatured = (direction) => {
    setFeaturedIndex((current) =>
      Math.min(featuredEvents.length - 1, Math.max(0, current + direction))
    );
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(heroBgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      gsap.fromTo(heroLeftTextRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 0.7, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(heroRightTextRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 0.7, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(heroLine1Ref.current,
        { scaleX: 0, transformOrigin: "left center", opacity: 0 },
        { scaleX: 1, opacity: 0.6, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(heroLine2Ref.current,
        { scaleX: 0, transformOrigin: "right center", opacity: 0 },
        { scaleX: 1, opacity: 0.6, duration: 1, delay: 0.5, ease: "power3.out" }
      );

      const heroChars = splitText("DRISHTI", heroTitleRef);
      gsap.fromTo(heroChars,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );

      // --- Particles in Hero ---
      const heroParticles = createParticles(heroParticlesRef.current, 40, ["#e19d00", "#ffffff", "#ffd700"]);
      heroParticles.forEach((particle) => {
        gsap.fromTo(particle,
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

      // Aftermovie Pin Sequence
      const aftermovieTl = gsap.timeline({
        scrollTrigger: {
          trigger: aftermovieSectionRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      gsap.set(aftermovieContainerRef.current, { y: "100vh" });

      aftermovieTl
        .to(aftermovieContainerRef.current, {
          y: "0vh",
          ease: "power2.out",
          duration: 1
        })
        .to(aftermovieContainerRef.current, {
          y: "0vh",
          duration: 1.5,
          ease: "none"
        });

      // Featured Events
      gsap.fromTo(featuredHeadingRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: featuredHeadingRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(featuredParagraphRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: "power3.out",
          scrollTrigger: { trigger: featuredParagraphRef.current, start: "top 90%", toggleActions: "play none none reverse" }
        }
      );

      featuredCardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 150, opacity: 0, rotateY: 45, scale: 0.8 },
          {
            y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none reverse" },
            delay: i * 0.15,
          }
        );
      });





      // Synchronize all triggers in DOM order
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      ctx?.revert();
    };
  }, []);




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

  // ---- IDEAS SECTION: Scroll-Driven Frame Rendering & Interactive Pin ----
  useEffect(() => {
    const section = ideasSectionRef.current;
    const img = ideasImageRef.current;
    if (!section || !img) return undefined;

    // Preload images to avoid flickering during fast scrolling
    const preloadedImages = [];
    for (let i = 1; i <= 150; i++) {
      const preload = new Image();
      preload.src = `/3dlogo/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      preloadedImages.push(preload);
    }

    let ctx = gsap.context(() => {
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
            
            // Map progress to frame index 1 to 150
            const frameIndex = Math.max(1, Math.min(150, Math.round(p * 149) + 1));
            const frameStr = String(frameIndex).padStart(3, '0');
            if (img) {
              img.src = `/3dlogo/ezgif-frame-${frameStr}.jpg`;
            }

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
      ctx?.revert();
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* ============ HERO ============ */}
      <section
        ref={heroSectionRef}
        className="relative h-[100svh] max-h-[1024px] min-h-[560px] w-full overflow-hidden bg-black"
        aria-labelledby="drishti-title"
      >
        <img
          ref={heroBgRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 pointer-events-none"
          alt=""
          aria-hidden="true"
          src={heroBg}
        />

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
          className="absolute bottom-40 md:bottom-10 left-0 w-full text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(64px,13vw,190px)] font-normal leading-none tracking-[0] text-white z-20"
        >
        </h1>
      </section>

      {/* ============ IDEAS DON'T ASK PERMISSION (PINNED SCROLL REVEAL) ============ */}
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
                            ? "w-5 bg-[#FFDB86] shadow-[0_0_10px_#FFDB86]"
                            : "w-1.5 bg-white/20 group-hover:bg-white/50"
                        }`}
                      />
                      <span
                        className={`font-['Space_Grotesk-Regular',Helvetica] text-[clamp(12px,1.2vw,17px)] font-medium tracking-[0.15em] transition-all duration-300 ${
                          isActive
                            ? "text-[#FFDB86] scale-105 drop-shadow-[0_0_12px_rgba(255,219,134,0.7)]"
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
                  className="w-full bg-gradient-to-b from-[#B78000] via-[#FFDB86] to-[#E19D00] shadow-[0_0_8px_#FFDB86] rounded-full"
                  style={{ height: "0%" }}
                />
              </div>
            </div>

            {/* Mobile Core Values Bar */}
            <div ref={mobileCoreWrapperRef} className="flex md:hidden relative justify-center items-center gap-1.5 px-2 z-20 flex-wrap opacity-0">
              {coreValues.map((value, index) => {
                const isActive = activeCoreValueIndex === index;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleCoreValueClick(index)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-wider transition-all duration-300 border ${
                      isActive
                        ? "bg-[#FFDB86]/15 border-[#FFDB86] text-[#FFDB86] shadow-[0_0_8px_rgba(255,219,134,0.4)]"
                        : "bg-black/40 border-white/10 text-white/40"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
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
                  src="/3dlogo/ezgif-frame-001.jpg"
                  alt="Drishti Emblem"
                />
              </div>
            </div>

            {/* Right Column: Festival Emblem Badge / Coordinates (Desktop Balance) */}
            <div 
              ref={ideasRightTextRef}
              className="hidden lg:flex flex-col items-end gap-1.5 absolute right-[3%] lg:right-[6%] top-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-40 font-mono text-[11px] tracking-widest text-white/70"
            >
              <span className="text-[#FFDB86]/80 font-bold">DRISHTI // 2026</span>
              <span>10° 32&apos; N, 76° 13&apos; E</span>
              <span className="text-[10px] text-white/40 mt-2">SCROLL TO REVEAL</span>
            </div>
          </div>

          {/* Bottom Title & Narrative */}
          <div className="w-full flex flex-col items-center justify-center text-center gap-2 md:gap-3 z-10 md:mt-auto pb-2">
            <h2
              ref={ideasTitleRef}
              id="hero-title"
              className="w-full max-w-[1100px] text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(28px,4.8vw,76px)] font-normal leading-[1.05] tracking-[0.01em] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] drop-shadow-[0_4px_24px_rgba(183,128,0,0.25)] select-none uppercase"
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

      {/* ============ AFTERMOVIE ============ */}
      <section ref={aftermovieSectionRef} className="relative h-[100svh] min-h-[600px] w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Static Gold Gradient Grid Background */}
        <div 
          ref={aftermovieGridRef}
          className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)]"
          style={{
            WebkitMaskImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
            WebkitMaskSize: '60px 60px',
            maskImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
            maskSize: '60px 60px',
          }}
        />

        <div className="relative w-[92%] md:w-[84%] lg:w-[76%] max-w-[1020px] flex flex-col items-center justify-center px-[clamp(10px,2vw,24px)] z-10">
          <div ref={aftermovieContainerRef} className="relative w-full aspect-[1415/850] overflow-hidden rounded-none p-[1px] md:p-[2px] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)]">
            <div className="relative w-full h-full flex flex-col justify-end bg-black rounded-none overflow-hidden">
              <video
                className="absolute left-0 top-0 h-full w-full object-cover opacity-80 scale-110"
                src={aftermovieVideo}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Drishti '24 aftermovie"
              />
              <div className="relative z-10 w-full flex flex-col border-t border-white/50 pt-[clamp(10px,1.8vw,22px)] pb-[clamp(10px,1.8vw,22px)] px-[clamp(16px,3vw,44px)] pointer-events-none">
                <div className="flex items-center justify-between">
                  <p
                    ref={aftermovieTitleLeftRef}
                    className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(30px,4.8vw,60px)] leading-[normal] text-white m-0"
                  >
                    DRISHTI &lsquo;24
                  </p>
                  <img
                    ref={aftermovieLogoRef}
                    className="pointer-events-none h-[clamp(30px,3.8vw,46px)] w-auto object-cover absolute left-1/2 -translate-x-1/2"
                    alt="Drishti"
                    src={aftermovieLogo}
                  />
                  <p
                    ref={aftermovieTitleRightRef}
                    className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(30px,4.8vw,60px)] leading-[normal] text-white m-0"
                  >
                    AFTERMOVIE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRO SHOWS ============ */}
      <section id="proshows" className="relative w-full bg-black overflow-hidden">
        <ProShows embedded={true} />
      </section>

      {/* ============ DRISH-TEES ============ */}
      <section className="relative w-full bg-black py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-[clamp(20px,5vw,71px)]">
          <h2 className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,5vw,64px)] font-normal leading-[1.1] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
            GRAB YOUR DRISH-TEES!!
          </h2>
          <video
            className="w-full max-w-[900px] self-center rounded-xl border border-white/15 object-cover shadow-[0_0_30px_rgba(225,157,0,0.2)]"
            src="/home/drishtee.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Drishtees promotional video"
          />
        </div>
      </section>



      {/* ============ FEATURED EVENTS ============ */}
      <section
        className="relative min-h-[clamp(800px,86vw,1250px)] w-full overflow-hidden bg-black py-20 flex flex-col justify-center"
        aria-labelledby="featured-events-heading"
      >
        <div
          className="absolute left-[-10%] top-[10%] h-[30%] w-[40%] rotate-[18.51deg] rounded-full bg-[#d9d9d9] opacity-[0.24] blur-[clamp(100px,14vw,208.1px)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[60%] top-[20%] h-[40%] w-[56%] rotate-[-6.92deg] rounded-full bg-[#d9d9d9] opacity-[0.24] blur-[clamp(100px,14vw,208.1px)]"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1440px] px-[clamp(20px,5vw,107px)] mx-auto relative z-10 flex flex-col gap-[clamp(20px,7.5vw,108px)]">
          <div>
            <h2
              ref={featuredHeadingRef}
              id="featured-events-heading"
              className="bg-[linear-gradient(143deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0.3)_100%)] bg-clip-text text-[clamp(48px,6.6vw,96px)] font-normal leading-[1.2] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-['Bietro_DEMO-Regular',Helvetica] opacity-0"
            >
              FEATURED EVENTS
            </h2>
            <p
              ref={featuredParagraphRef}
              className="mt-[clamp(10px,2vw,30px)] font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,1.5vw,22px)] font-normal leading-[1.4] tracking-[0] text-white opacity-0"
            >
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          <div className="relative w-full">
            <div className="overflow-hidden w-full" ref={carouselContainerRef}>
              <div
                className="flex w-max items-center gap-[11px] transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${featuredIndex * carouselStep}px)` }}
              >
                {featuredEvents.map((event, index) => (
                  <article
                    key={index}
                    ref={(el) => {
                      if (index === 0) carouselCardRef.current = el;
                      featuredCardsRef.current[index] = el;
                    }}
                    className="relative h-[clamp(400px,39.5vw,569px)] w-[clamp(280px,27.8vw,401px)] shrink-0 overflow-hidden border border-solid border-white opacity-0 group cursor-pointer"
                    style={{ perspective: "1000px" }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        rotateY: 5,
                        rotateX: 3,
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(225,157,0,0.3)",
                        duration: 0.4,
                        ease: "power2.out",
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        rotateY: 0,
                        rotateX: 0,
                        scale: 1,
                        boxShadow: "0 0px 0px rgba(225,157,0,0)",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)",
                      });
                    }}
                  >
                    <img
                      className="absolute left-0 top-0 h-[calc(100%-68px)] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={`Featured event ${index + 1}`}
                      src={event.image}
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 flex h-[68px] w-full cursor-pointer items-center justify-between px-[13px] text-left border-t border-white bg-black/50 backdrop-blur-sm transition-all duration-300 hover:bg-gold/30 hover:border-gold"
                      aria-label={`View details for featured event ${index + 1}`}
                      onClick={() => handleRegistration(index)}
                    >
                      <span className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(18px,2vw,28px)] font-normal leading-8 tracking-[0] text-white transition-colors duration-300 group-hover:text-gold">
                        VIEW DETAILS
                      </span>
                      <img
                        className="h-[clamp(20px,2.2vw,32px)] w-[clamp(20px,2.2vw,32px)] -rotate-90 transition-all duration-300 group-hover:rotate-0 group-hover:scale-125"
                        alt=""
                        aria-hidden="true"
                        src={arrowDownRight}
                      />
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 -left-4 -right-4 flex items-center justify-between pointer-events-none z-20 md:-left-[70px] md:-right-[70px]">
              <button
                type="button"
                className="flex h-12 w-12 rotate-[135deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50 transition-all duration-300 hover:bg-gold/30 hover:border-gold hover:scale-110 hover:rotate-[180deg]"
                onClick={() => moveFeatured(-1)}
                disabled={featuredIndex === 0}
                aria-label="Previous featured events"
              >
                <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 -rotate-[45deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50 transition-all duration-300 hover:bg-gold/30 hover:border-gold hover:scale-110 hover:rotate-0"
                onClick={() => moveFeatured(1)}
                disabled={featuredIndex === featuredEvents.length - 1}
                aria-label="Next featured events"
              >
                <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY (3D DOME GALLERY WITH PARALLAX) ============ */}
      <section className="relative w-full bg-black flex flex-col items-center justify-center pt-16 md:pt-24 pb-8 overflow-hidden border-y border-white/5" aria-label="Event gallery">
        {/* Title placed directly above the dome */}
        <div className="relative z-10 text-center px-4 mb-2 md:mb-4 pointer-events-none">
          <h2 className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,5vw,64px)] tracking-[0.05em] uppercase bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] drop-shadow-[0_4px_24px_rgba(183,128,0,0.35)] leading-tight">
            EXPERIENCE DRISHTI
          </h2>
        </div>

        {/* 3D Dome Gallery Container */}
        <div className="relative w-full h-[72vh] min-h-[560px] max-h-[860px]">
          <DomeGallery
            images={drishtiGalleryImages}
            fit={1}
            minRadius={800}
            maxVerticalRotationDeg={20}
            segments={20}
            grayscale={false}
            openedImageWidth="clamp(300px, 60vw, 520px)"
            openedImageHeight="clamp(300px, 60vw, 520px)"
            imageBorderRadius="18px"
            openedImageBorderRadius="24px"
            overlayBlurColor="#000000"
            scrollParallax={true}
            scrollParallaxAngle={110}
          />
        </div>
      </section>



      <Footer />

      {activeModalEvent && (
        <EventDetailsModal
          event={activeModalEvent}
          onClose={() => setActiveModalEvent(null)}
        />
      )}
    </main>
  );
}

export default Home;
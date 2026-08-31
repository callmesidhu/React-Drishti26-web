import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProShows from "./ProShows";
import EventDetailsModal from "../components/EventDetailsModal";
import { dakshaEventsData, competitionsData, workshopsData } from "../data/eventsData";

gsap.registerPlugin(ScrollTrigger);

const heroBg = "/home/drishti-take-1.png";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";
const ideasVectorLine = "/home/ideas-vector-line.svg";
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

const workshopItems = [
  { title: "WORKSHOPS", image: categoriesPhoto, rotate: -11.17 },
  { title: "COMPETITIONS", image: categoriesPhoto, rotate: 11.17 },
  { title: "PRO SHOWS", image: categoriesPhoto, rotate: -11.17 },
];

const featuredEvents = [
  dakshaEventsData[0],
  competitionsData[0],
  competitionsData[1],
  workshopsData[0],
];

const galleryImages = [
  { src: galleryImage1, className: "md:absolute md:left-[clamp(200px,35vw,511px)] md:top-[clamp(100px,15vw,228px)] md:h-[clamp(300px,37vw,543px)] md:w-[clamp(200px,27vw,394px)] w-full aspect-[394/543]" },
  { src: galleryImage2, className: "md:absolute md:left-[clamp(500px,65vw,937px)] md:top-[clamp(50px,7vw,105px)] md:h-[clamp(200px,27vw,395px)] md:w-[clamp(150px,20vw,287px)] w-full aspect-[287/395]" },
  { src: galleryImage3, className: "md:absolute md:left-[clamp(80px,13vw,190px)] md:top-[clamp(300px,37vw,538px)] md:h-[clamp(200px,27vw,395px)] md:w-[clamp(150px,20vw,287px)] w-full aspect-[287/395]" },
  { src: galleryImage4, className: "md:absolute md:left-[clamp(60px,10vw,144px)] md:top-[clamp(150px,21vw,303px)] md:h-[clamp(100px,15vw,216px)] md:w-[clamp(150px,20vw,287px)] w-full aspect-[287/216]" },
  { src: galleryImage5, className: "md:absolute md:left-[clamp(500px,65vw,939px)] md:top-[clamp(300px,38vw,555px)] md:h-[clamp(100px,15vw,216px)] md:w-[clamp(150px,20vw,287px)] w-full aspect-[287/216]" },
];

function Home() {
  const [activeWorkshopItem, setActiveWorkshopItem] = useState("");
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [carouselStep, setCarouselStep] = useState(412);
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [introDone, setIntroDone] = useState(false);

  const categoryImageRef = useRef(null);
  const categoryListRef = useRef(null);
  const itemRefs = useRef([]);
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
  const introOverlayRef = useRef(null);
  const introTitleRef = useRef(null);
  const ideasSectionRef = useRef(null);
  const ideasEmblemWrapperRef = useRef(null);
  const ideasVideoRef = useRef(null);
  const ideasTitleRef = useRef(null);
  const ideasParagraphRef = useRef(null);
  const coreValuesRef = useRef([]);
  const ideasVectorLineRef = useRef(null);
  const categoryTitleRefs = useRef([]);
  const categoryBordersRef = useRef([]);
  const featuredHeadingRef = useRef(null);
  const featuredParagraphRef = useRef(null);
  const featuredCardsRef = useRef([]);
  const aftermovieContainerRef = useRef(null);
  const aftermovieTitleLeftRef = useRef(null);
  const aftermovieTitleRightRef = useRef(null);
  const aftermovieLogoRef = useRef(null);
  const galleryImagesRef = useRef([]);
  const ctaDrishtiRef = useRef(null);
  const ctaTitle1Ref = useRef(null);
  const ctaTitle2Ref = useRef(null);
  const ctaButtonRef = useRef(null);
  const ctaBorderRef = useRef(null);
  const ctaParticlesRef = useRef(null);

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

  const handleWorkshopItemClick = (title, index) => {
    setActiveWorkshopItem(title);
    if (window.innerWidth < 768) {
      setHoveredCategoryIndex((current) => (current === index ? null : index));
    }
  };

  const handleCategoryInteraction = (index) => {
    setHoveredCategoryIndex(index);
  };

  const handleCategoryLeave = (index) => {
    setHoveredCategoryIndex((current) => (current === index ? null : current));
  };

  useEffect(() => {
    const el = categoryImageRef.current;
    if (!el || !categoryListRef.current) return;
    if (window.innerWidth < 768) return;

    gsap.killTweensOf(el);

    if (hoveredCategoryIndex !== null && itemRefs.current[hoveredCategoryIndex]) {
      const itemEl = itemRefs.current[hoveredCategoryIndex];
      const listRect = categoryListRef.current.getBoundingClientRect();
      const sectionRect = categoryListRef.current.parentElement.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      const arrowButtonWidth = itemEl.lastElementChild?.getBoundingClientRect().width ?? 0;
      const imageWidth = el.getBoundingClientRect().width;

      const top = itemRect.top - listRect.top + (itemRect.height / 2) - 150;
      const preferredLeft = itemRect.left - sectionRect.left + (itemRect.width / 2) + 150;
      const maxLeft = listRect.right - sectionRect.left - arrowButtonWidth - 24 - imageWidth;
      const left = Math.min(preferredLeft, maxLeft);
      const { rotate: targetRotate } = workshopItems[hoveredCategoryIndex];

      gsap.fromTo(el,
        { opacity: 0, scale: 0.85, rotate: 0, top, left },
        { opacity: 1, scale: 1, rotate: targetRotate, top, left, duration: 0.55, ease: "power3.out" }
      );

      gsap.to(el, {
        y: "+=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      gsap.to(el, { opacity: 0, scale: 0.85, rotate: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [hoveredCategoryIndex]);

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
    let ctx;
    let timer;

    timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo(heroBgRef.current,
          { scale: 1.5, opacity: 0, rotation: 5, rotationY: 15, filter: "blur(20px)" },
          { scale: 1, opacity: 1, rotation: 0, rotationY: 0, filter: "blur(0px)", duration: 2.5, ease: "power4.out" }
        );

        gsap.fromTo(heroLeftTextRef.current,
          { x: -120, opacity: 0, skewX: 25, rotateY: 30 },
          { x: 0, opacity: 0.6, skewX: 0, rotateY: 0, duration: 1.2, delay: 0.8, ease: "elastic.out(1, 0.5)" }
        );

        gsap.fromTo(heroRightTextRef.current,
          { x: 120, opacity: 0, skewX: -25, rotateY: -30 },
          { x: 0, opacity: 0.6, skewX: 0, rotateY: 0, duration: 1.2, delay: 0.8, ease: "elastic.out(1, 0.5)" }
        );

        gsap.fromTo(heroLine1Ref.current,
          { scaleX: 0, transformOrigin: "left center", opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, delay: 1, ease: "elastic.out(1, 0.3)" }
        );

        gsap.fromTo(heroLine2Ref.current,
          { scaleX: 0, transformOrigin: "right center", opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, delay: 1, ease: "elastic.out(1, 0.3)" }
        );

        const heroChars = splitText("DRISHTI", heroTitleRef);
        gsap.fromTo(heroChars,
          { y: 100, opacity: 0, rotationX: -120, scale: 0.5 },
          { y: 0, opacity: 1, rotationX: 0, scale: 1, stagger: 0.1, duration: 1, delay: 0.6, ease: "back.out(2)" }
        );

        gsap.to(heroBgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroBgRef.current?.closest('section'),
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

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

        // Event Categories
        categoryTitleRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { x: -100, opacity: 0, skewX: 20 },
            {
              x: 0, opacity: 1, skewX: 0, duration: 1, ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
              delay: i * 0.12,
            }
          );
        });

        categoryBordersRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1, duration: 0.8, ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
              delay: i * 0.1,
            }
          );
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

        // Aftermovie
        gsap.fromTo(aftermovieContainerRef.current,
          { scale: 0.7, opacity: 0, borderRadius: "50px" },
          {
            scale: 1, opacity: 1, borderRadius: "0px", duration: 1.5, ease: "power3.out",
            scrollTrigger: { trigger: aftermovieContainerRef.current, start: "top 80%", end: "top 40%", scrub: 1 }
          }
        );

        gsap.fromTo(aftermovieTitleLeftRef.current,
          { x: -150, opacity: 0, skewX: 30 },
          {
            x: 0, opacity: 1, skewX: 0, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: aftermovieTitleLeftRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        gsap.fromTo(aftermovieTitleRightRef.current,
          { x: 150, opacity: 0, skewX: -30 },
          {
            x: 0, opacity: 1, skewX: 0, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: aftermovieTitleRightRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        gsap.fromTo(aftermovieLogoRef.current,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1, opacity: 1, rotation: 0, duration: 1, delay: 0.4, ease: "elastic.out(1, 0.3)",
            scrollTrigger: { trigger: aftermovieLogoRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        // Gallery
        galleryImagesRef.current.forEach((el, i) => {
          if (!el) return;
          const directions = [
            { x: -300, y: 150, rotation: -20, scale: 0.5 },
            { x: 300, y: -120, rotation: 15, scale: 0.6 },
            { x: -250, y: -180, rotation: -12, scale: 0.55 },
            { x: 280, y: 120, rotation: 18, scale: 0.65 },
            { x: -200, y: 200, rotation: -8, scale: 0.5 },
          ];
          const dir = directions[i] || { x: 0, y: 0, rotation: 0, scale: 0.5 };

          gsap.fromTo(el,
            { x: dir.x, y: dir.y, rotation: dir.rotation, opacity: 0, scale: dir.scale },
            {
              x: 0, y: 0, rotation: 0, opacity: 0.85, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.4)",
              scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none reverse" },
              delay: i * 0.15,
            }
          );
        });

        // CTA
        gsap.fromTo(ctaDrishtiRef.current,
          { scale: 0.2, opacity: 0, y: 150, rotation: -5 },
          {
            scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.4)",
            scrollTrigger: { trigger: ctaDrishtiRef.current, start: "top 90%", end: "top 50%", scrub: 1 }
          }
        );

        gsap.fromTo(ctaTitle1Ref.current,
          { x: -120, opacity: 0, skewX: 25 },
          {
            x: 0, opacity: 1, skewX: 0, duration: 1, ease: "power4.out",
            scrollTrigger: { trigger: ctaTitle1Ref.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        gsap.fromTo(ctaTitle2Ref.current,
          { x: 120, opacity: 0, skewX: -25 },
          {
            x: 0, opacity: 1, skewX: 0, duration: 1, delay: 0.2, ease: "power4.out",
            scrollTrigger: { trigger: ctaTitle2Ref.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        gsap.fromTo(ctaBorderRef.current,
          { scaleX: 0, boxShadow: "0 0 0px rgba(255,193,50,0)" },
          {
            scaleX: 1, boxShadow: "0 0 30px rgba(255,193,50,0.6)", duration: 1.5, ease: "power2.inOut",
            scrollTrigger: { trigger: ctaBorderRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );

        gsap.fromTo(ctaButtonRef.current,
          { y: 60, opacity: 0, scale: 0.8, borderRadius: "100px" },
          {
            y: 0, opacity: 1, scale: 1, borderRadius: "50px", duration: 1, ease: "elastic.out(1, 0.4)",
            scrollTrigger: { trigger: ctaButtonRef.current, start: "top 95%", toggleActions: "play none none reverse" }
          }
        );

        const ctaParticles = createParticles(ctaParticlesRef.current, 25, ["#e19d00", "#ffd700", "#ffffff"]);
        ctaParticles.forEach((particle) => {
          gsap.fromTo(particle,
            { opacity: 0, scale: 0, y: 50 },
            { opacity: Math.random() * 0.5 + 0.3, scale: 1, y: 0, duration: Math.random() * 2 + 1, delay: Math.random() * 2, ease: "power2.out" }
          );
        });

      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  // ---- Intro curtain: DRISHTI fades in on black, then crossfades into hero ----
  // Deliberately simple and time-based (no ScrollTrigger, no dependency on
  // anything else finishing first) — fires once on mount. Its fade-out
  // overlaps the existing hero entrance above, which already starts
  // fading the hero content in on its own 100ms-delayed timer, producing
  // the crossfade without the two sequences needing to be tightly chained.
  useEffect(() => {
    if (!introTitleRef.current || !introOverlayRef.current) return undefined;

    const timeline = gsap.timeline({
      onComplete: () => setIntroDone(true),
    });

    timeline
      .to(introTitleRef.current, { opacity: 1, duration: 0.7, ease: "power2.out" })
      .to(introTitleRef.current, { opacity: 1, duration: 0.6 }) // hold
      .to(introOverlayRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" });

    return () => timeline.kill();
  }, []);

  // ---- Hero background: hover warp ----
  // A CSS-transform-based tilt/scale that tracks the cursor, giving a
  // "warping" feel without a real pixel-displacement shader. Uses
  // gsap.quickTo, which is built specifically for smoothly interpolating
  // high-frequency updates like mousemove without creating a new tween on
  // every event.
  useEffect(() => {
    const section = heroSectionRef.current;
    const bg = heroBgRef.current;
    if (!section || !bg) return undefined;

    section.style.perspective = "1000px";

    const setRotateX = gsap.quickTo(bg, "rotationX", { duration: 0.6, ease: "power3.out" });
    const setRotateY = gsap.quickTo(bg, "rotationY", { duration: 0.6, ease: "power3.out" });
    const setScale = gsap.quickTo(bg, "scale", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 -> 0.5
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      setRotateX(normalizedY * -8);
      setRotateY(normalizedX * 8);
      setScale(1.04);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // ---- IDEAS SECTION: video reveal + text sequence ----
  // Non-scrub, deliberately: video.currentTime scrubbing on a compressed
  // MP4 has to decode forward from the nearest keyframe on every seek,
  // which causes stutter — the same class of problem as tonight's canvas
  // glitching. A plain "played once when scrolled into view" is far more
  // reliable. Uses IntersectionObserver (no ScrollTrigger, no pinning) —
  // fires once, then plays the video through, then reveals all the text
  // in one chained sequence once the video ends.
  useEffect(() => {
    const trigger = ideasEmblemWrapperRef.current;
    const video = ideasVideoRef.current;
    if (!trigger || !video) return undefined;

    let hasPlayed = false;

    const playSequence = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      const revealText = () => {
        gsap
          .timeline()
          .fromTo(
            ideasTitleRef.current,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "power4.inOut" },
          )
          .fromTo(
            coreValuesRef.current,
            { x: -60, opacity: 0, rotation: -10 },
            { x: 0, opacity: 0.5, rotation: 0, stagger: 0.15, duration: 0.8, ease: "elastic.out(1, 0.5)" },
            "<0.15",
          )
          .fromTo(
            ideasVectorLineRef.current,
            { scaleY: 0, transformOrigin: "top center", opacity: 0 },
            { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
            "<",
          )
          .fromTo(
            ideasParagraphRef.current,
            { y: 60, opacity: 0, skewY: 5 },
            { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out" },
            "<0.2",
          );
      };

      gsap.to(video, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          video.play().catch(() => {
            // Autoplay can be blocked even when muted, in rare cases —
            // fall back to revealing the text anyway rather than getting
            // stuck waiting on a video that will never play.
            revealText();
          });
        },
      });

      video.addEventListener("ended", revealText, { once: true });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          playSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      {/* ============ INTRO CURTAIN ============ */}
      {!introDone && (
        <div
          ref={introOverlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <span
            ref={introTitleRef}
            className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(48px,10vw,140px)] font-normal leading-[normal] tracking-[0] text-white opacity-0"
          >
            DRISHTI
          </span>
        </div>
      )}

      <Navbar />

      {/* ============ HERO ============ */}
      <section
        ref={heroSectionRef}
        className="relative h-[100svh] max-h-[1024px] min-h-[560px] w-full overflow-hidden bg-black"
        aria-labelledby="drishti-title"
      >
        <img
          ref={heroBgRef}
          className="absolute left-0 top-0 h-full w-full object-cover opacity-0"
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

        <div ref={heroParticlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10" />

        {/* Bottom-anchored content block: guarantees the title stays within
           the viewport regardless of screen aspect ratio, instead of the
           old vw-based absolute positioning that overshot on wide/short
           laptop screens. */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-[clamp(60px,10vh,140px)]">
          <div className="flex flex-wrap items-center justify-between gap-4 px-[clamp(20px,3vw,44px)] pb-[clamp(24px,4vh,48px)]">
            <div className="flex items-center gap-4">
              <div
                ref={heroLeftTextRef}
                className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-0 whitespace-nowrap"
              >
                FEST UNLIKE ANY OTHER
              </div>
              <img
                ref={heroLine1Ref}
                className="hidden md:block h-0.5 w-[clamp(120px,20vw,300px)]"
                alt=""
                aria-hidden="true"
                src={heroLine1}
              />
            </div>
            <div className="flex items-center gap-4">
              <img
                ref={heroLine2Ref}
                className="hidden md:block h-0.5 w-[clamp(120px,20vw,300px)]"
                alt=""
                aria-hidden="true"
                src={heroLine2}
              />
              <div
                ref={heroRightTextRef}
                className="text-right font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-0 whitespace-nowrap"
              >
                REWIND AND REJOICE
              </div>
            </div>
          </div>
          <h1
            ref={heroTitleRef}
            id="drishti-title"
            className="w-full text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(56px,12.5vw,180px)] font-normal leading-[normal] tracking-[0] text-white"
          >
          </h1>
        </div>
      </section>

      {/* ============ IDEAS DON'T ASK PERMISSION (SCRUBBED 360 ROTATION) ============ */}
      <section
        ref={ideasSectionRef}
        className="relative min-h-screen py-20 w-full overflow-hidden bg-black flex flex-col md:flex-row items-center justify-center gap-10"
        aria-labelledby="hero-title"
      >
        <div className="w-full max-w-[1440px] px-[clamp(20px,5vw,71px)] relative flex flex-col items-center">
          <aside
            className="md:absolute md:left-[5%] md:top-0 flex md:flex-col items-center md:items-start gap-[26px] opacity-50 flex-wrap justify-center z-10 mb-10 md:mb-0"
            aria-label="Core values"
          >
            <ul className="m-0 flex md:flex-col flex-row flex-wrap justify-center gap-[clamp(10px,1.8vw,26px)] p-0 list-none">
              {coreValues.map((value, index) => (
                <li
                  ref={(el) => { coreValuesRef.current[index] = el }}
                  className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(14px,1.5vw,22px)] font-normal leading-none tracking-[0] text-white opacity-0"
                  key={value}
                >
                  {value}
                </li>
              ))}
            </ul>
          </aside>

          <img
            ref={ideasVectorLineRef}
            className="hidden md:block absolute left-[20%] top-0 h-[263px] w-0.5 z-10"
            alt=""
            aria-hidden="true"
            src={ideasVectorLine}
          />

          <div className="flex flex-col items-center justify-center w-full gap-10 mb-10 relative z-10">
            <div
              ref={ideasEmblemWrapperRef}
              className="w-[clamp(360px,54vw,780px)] relative"
            >
              <video
                ref={ideasVideoRef}
                className="w-full h-auto opacity-0"
                src="/home/ideas-emblem-reveal.mp4"
                muted
                playsInline
                preload="auto"
              />
            </div>
          </div>

          <div
            ref={ideasTitleRef}
            id="hero-title"
            className="w-full max-w-[1062px] text-center bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(48px,6.6vw,96px)] font-normal leading-[1.2] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] relative z-10 opacity-0"
          >
            IDEAS DON&apos;T ASK PERMISSION
          </div>

          <p
            ref={ideasParagraphRef}
            className="mt-[clamp(40px,10vw,150px)] w-full max-w-[1019px] text-center font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,1.6vw,24px)] font-normal leading-[1.4] tracking-[0] text-white relative z-10 opacity-0"
          >
            Lorem ipsum dolor sit amet consectetur. Leo in velit tristique morbi
            facilisi facilisis vestibulum in. Odio rutrum eu nisi tempor sit vel.
            Sed dignissim viverra interdum nunc at diam turpis. Integer odio risus
            aliquam maecenas porttitor.
          </p>
        </div>
      </section>

      {/* ============ EVENT CATEGORIES ============ */}
      <section className="relative min-h-[clamp(600px,86vw,1250px)] w-full bg-black flex items-center justify-center py-20 overflow-hidden" aria-label="Event categories">
        <div
          ref={categoryListRef}
          className="relative flex w-full max-w-[1440px] px-[clamp(20px,5vw,71px)] flex-col items-start gap-[clamp(20px,3.2vw,47px)] z-10"
          aria-label="Available event categories"
        >
          {workshopItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                itemRefs.current[index] = el;
                categoryTitleRefs.current[index] = el;
              }}
              className="relative min-h-[clamp(80px,7.8vw,113px)] w-full self-stretch border-b border-white flex items-center justify-between group opacity-0"
              onMouseEnter={() => handleCategoryInteraction(index)}
              onMouseLeave={() => handleCategoryLeave(index)}
              onFocus={() => window.innerWidth >= 768 && handleCategoryInteraction(index)}
              onBlur={() => window.innerWidth >= 768 && handleCategoryLeave(index)}
            >
              <button
                type="button"
                className={`all-unset text-left z-10 cursor-pointer bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,4.4vw,64px)] font-normal leading-[normal] tracking-[0] text-transparent [-webkit-background-clip:text] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-transform duration-300 ${hoveredCategoryIndex === index ? '-translate-x-4 md:-translate-x-8' : ''}`}
                onClick={() => handleWorkshopItemClick(item.title, index)}
                aria-pressed={activeWorkshopItem === item.title}
              >
                {item.title}
              </button>
              <button
                type="button"
                className="all-unset z-10 flex h-[clamp(40px,7.2vw,104px)] w-[clamp(40px,7.2vw,104px)] cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-125 hover:rotate-45"
                onClick={() => handleWorkshopItemClick(item.title, index)}
                aria-label={`View ${item.title.toLowerCase()}`}
                aria-pressed={activeWorkshopItem === item.title}
              >
                <img
                  className="h-[77.84%] w-[77.84%] transition-transform duration-300"
                  alt=""
                  aria-hidden="true"
                  src={arrowDownRight}
                />
              </button>
            </div>
          ))}
        </div>
        <img
          ref={categoryImageRef}
          className="pointer-events-none absolute hidden h-[clamp(250px,30vw,443px)] w-[clamp(200px,24vw,358px)] object-cover opacity-0 z-20 shadow-2xl md:block"
          alt={hoveredCategoryIndex !== null ? `${workshopItems[hoveredCategoryIndex].title} preview` : ""}
          aria-hidden={hoveredCategoryIndex === null}
          src={workshopItems[hoveredCategoryIndex ?? 0].image}
        />
      </section>

      {/* ============ PRO SHOWS ============ */}
      <section id="proshows" className="relative w-full bg-black">
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

      {/* ============ AFTERMOVIE ============ */}
      <section className="relative min-h-[clamp(600px,71vw,1024px)] w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[1415px] flex flex-col items-center justify-center px-[clamp(20px,4vw,60px)]">
          <div ref={aftermovieContainerRef} className="relative w-full aspect-[1415/850] mb-8 flex flex-col justify-end opacity-0 overflow-hidden">
            <video
              className="absolute left-0 top-0 h-full w-full object-cover opacity-80 scale-110"
              src={aftermovieVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Drishti '24 aftermovie"
            />
            <div className="relative z-10 w-full flex flex-col border-t border-white/50 pt-[clamp(10px,2vw,24px)] pb-[clamp(10px,2vw,24px)] px-[clamp(16px,3vw,48px)] pointer-events-none">
              <div className="flex items-center justify-between">
                <p
                  ref={aftermovieTitleLeftRef}
                  className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(32px,5vw,58px)] leading-[normal] text-white m-0 opacity-0"
                >
                  DRISHTI &lsquo;24
                </p>
                <img
                  ref={aftermovieLogoRef}
                  className="pointer-events-none h-[clamp(32px,4vw,45px)] w-auto object-cover absolute left-1/2 -translate-x-1/2 opacity-0"
                  alt="Drishti"
                  src={aftermovieLogo}
                />
                <p
                  ref={aftermovieTitleRightRef}
                  className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(32px,5vw,58px)] leading-[normal] text-white m-0 opacity-0"
                >
                  AFTERMOVIE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="relative min-h-[clamp(600px,71vw,1024px)] w-full bg-black flex items-center justify-center" aria-label="Event gallery">
        <div className="relative w-full max-w-[1415px] min-h-[600px] md:h-[999px] flex flex-col md:block items-center gap-4 py-10 px-[20px] overflow-hidden">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              ref={(el) => { galleryImagesRef.current[index] = el }}
              className={`${image.className} object-cover opacity-0 rounded-lg md:rounded-none cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(225,157,0,0.4)]`}
              alt={`Gallery photo ${index + 1}`}
              src={image.src}
            />
          ))}
        </div>
      </section>

      {/* ============ READY TO BUILD THE FUTURE? ============ */}
      <section
        className="relative flex min-h-[clamp(800px,97vw,1404px)] py-[clamp(100px,14vw,201px)] w-full flex-col items-center bg-black px-4 overflow-hidden"
        aria-label="Registration call to action"
      >
        <div ref={ctaParticlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />

        <p
          ref={ctaDrishtiRef}
          className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(64px,10.8vw,156px)] leading-none text-white text-center opacity-0 relative z-10"
        >
          DRISHTI
        </p>
        <div className="mt-[clamp(40px,6.8vw,98px)] w-full max-w-[715px] text-center overflow-hidden relative z-10">
          <p
            ref={ctaTitle1Ref}
            className="m-0 font-['Clash_Display-Medium',Helvetica] text-[clamp(40px,5vw,72px)] leading-[normal] tracking-[1.44px] text-white opacity-0"
          >
            READY TO BUILD
          </p>
          <p
            ref={ctaTitle2Ref}
            className="m-0 font-['Clash_Display-Medium',Helvetica] text-[clamp(40px,5vw,72px)] leading-[normal] tracking-[1.44px] text-white opacity-0"
          >
            THE FUTURE?
          </p>
        </div>
        <div ref={ctaBorderRef} className="w-full max-w-[514px] h-[2px] bg-[#ffc132] mt-[clamp(40px,6.3vw,91px)] relative z-10" style={{ transformOrigin: "center", boxShadow: "0 0 0px rgba(255,193,50,0)" }} />
        <a
          ref={ctaButtonRef}
          href="#register"
          className="mt-8 flex h-[clamp(60px,7vw,103px)] w-full max-w-[514px] items-center justify-center rounded-[50px] border-2 border-solid border-[#ffc132] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-all duration-300 hover:bg-[#ffc132]/10 hover:scale-105 active:scale-95 opacity-0 relative z-10"
        >
          <span className="bg-gradient-to-b from-[#ffc746] via-[52.404%] via-[#ffd779] to-[#8d6200] bg-clip-text text-center font-['Clash_Display-Medium',Helvetica] text-[clamp(24px,2.7vw,40px)] leading-[normal] text-transparent">
            Register Now
          </span>
        </a>
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
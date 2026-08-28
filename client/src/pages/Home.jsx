import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const heroBg = "/home/drishti-take-1.png";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";
const ideasEmblem = "/home/ideas-emblem.png";
const ideasVectorLine = "/home/ideas-vector-line.svg";
const categoriesPhoto = "/home/categories-photo.png";
const arrowDownRight = "/home/arrow-down-right.svg";
const featuredEventPoster = "/home/featured-event-poster.png";
const aftermovieVideo = "/home/aftermovie.mp4";
const aftermovieLogo = "/home/aftermovie-logo.png";
const galleryImage1 = "/home/gallery-1.png";
const galleryImage2 = "/home/gallery-2.png";
const galleryImage3 = "/home/gallery-3.png";
const galleryImage4 = "/home/gallery-4.png";
const galleryImage5 = "/home/gallery-5.png";

const coreValues = ["INNOVATION", "FUTURE", "COLLABORATION", "EXCELLANCE", "LEGACY"];

const workshopItems = [
  { title: "WORKSHOPS", image: categoriesPhoto, rotate: -11.17 },
  { title: "COMPETITIONS", image: categoriesPhoto, rotate: 11.17 },
  { title: "TALKS AND PANELS", image: categoriesPhoto, rotate: -11.17 },
  { title: "EXHIBITIONS", image: categoriesPhoto, rotate: 11.17 },
  { title: "PRO SHOWS", image: categoriesPhoto, rotate: -11.17 },
];

const featuredEvents = [
  { image: featuredEventPoster },
  { image: featuredEventPoster },
  { image: featuredEventPoster },
  { image: featuredEventPoster },
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
  const ideasEmblemRef = useRef(null);
  const ideasTitleRef = useRef(null);
  const ideasParagraphRef = useRef(null);
  const coreValuesRef = useRef([]);
  const ideasVectorLineRef = useRef(null);
  const categoryTitleRefs = useRef([]);
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

  // Reveal + tilt the category photo
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
    } else {
      gsap.to(el, { opacity: 0, scale: 0.85, rotate: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [hoveredCategoryIndex]);

  // Responsive Carousel Math
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
    window.dispatchEvent(
      new CustomEvent("featured-event-registration", { detail: { eventIndex } })
    );
  };

  const moveFeatured = (direction) => {
    setFeaturedIndex((current) =>
      Math.min(featuredEvents.length - 1, Math.max(0, current + direction))
    );
  };

  // ==================== GSAP ANIMATIONS ====================
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ---- HERO ANIMATIONS ----
      gsap.fromTo(heroBgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
      );

      gsap.fromTo(heroLeftTextRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 0.6, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(heroRightTextRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 0.6, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(heroLine1Ref.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, delay: 0.7, ease: "power2.inOut" }
      );

      gsap.fromTo(heroLine2Ref.current,
        { scaleX: 0, transformOrigin: "right center" },
        { scaleX: 1, duration: 1, delay: 0.7, ease: "power2.inOut" }
      );

      gsap.fromTo(heroTitleRef.current,
        { scale: 0.5, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "back.out(1.2)" }
      );

      // Hero parallax on scroll
      gsap.to(heroBgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroBgRef.current?.closest('section'),
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // ---- IDEAS DON'T ASK PERMISSION ANIMATIONS ----
      gsap.fromTo(ideasEmblemRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ideasEmblemRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(ideasTitleRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: ideasTitleRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(ideasParagraphRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: ideasParagraphRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Core values stagger
      gsap.fromTo(coreValuesRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 0.5, stagger: 0.12, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: coreValuesRef.current[0],
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Ideas vector line draw
      if (ideasVectorLineRef.current) {
        gsap.fromTo(ideasVectorLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 1.2, ease: "power2.inOut",
            scrollTrigger: {
              trigger: ideasVectorLineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            }
          }
        );
      }

      // ---- EVENT CATEGORIES ANIMATIONS ----
      categoryTitleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { x: -80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      // ---- FEATURED EVENTS ANIMATIONS ----
      gsap.fromTo(featuredHeadingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: featuredHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(featuredParagraphRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: featuredParagraphRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      featuredCardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );
      });

      // ---- AFTERMOVIE ANIMATIONS ----
      gsap.fromTo(aftermovieContainerRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: aftermovieContainerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(aftermovieTitleLeftRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: aftermovieTitleLeftRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(aftermovieTitleRightRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: aftermovieTitleRightRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(aftermovieLogoRef.current,
        { scale: 0, opacity: 0, rotation: -90 },
        {
          scale: 1, opacity: 1, rotation: 0, duration: 0.8, delay: 0.3, ease: "back.out(2)",
          scrollTrigger: {
            trigger: aftermovieLogoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // ---- GALLERY ANIMATIONS ----
      galleryImagesRef.current.forEach((el, i) => {
        if (!el) return;
        const directions = [
          { x: -200, y: 100, rotation: -15 },
          { x: 200, y: -80, rotation: 10 },
          { x: -150, y: -120, rotation: -8 },
          { x: 180, y: 80, rotation: 12 },
          { x: -100, y: 150, rotation: -5 },
        ];
        const dir = directions[i] || { x: 0, y: 0, rotation: 0 };

        gsap.fromTo(el,
          { x: dir.x, y: dir.y, rotation: dir.rotation, opacity: 0, scale: 0.7 },
          {
            x: 0, y: 0, rotation: 0, opacity: 0.8, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.12,
          }
        );
      });

      // ---- CTA (READY TO BUILD THE FUTURE) ANIMATIONS ----
      gsap.fromTo(ctaDrishtiRef.current,
        { scale: 0.3, opacity: 0, y: 100 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: ctaDrishtiRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(ctaTitle1Ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: ctaTitle1Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(ctaTitle2Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: ctaTitle2Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(ctaBorderRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1, ease: "power2.inOut",
          scrollTrigger: {
            trigger: ctaBorderRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      gsap.fromTo(ctaButtonRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // CTA button glow pulse
      gsap.to(ctaButtonRef.current, {
        boxShadow: "0 0 40px rgba(255,193,50,0.5)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: ctaButtonRef.current,
          start: "top 90%",
          toggleActions: "play pause resume pause",
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* ============ HERO ============ */}
      <section
        className="relative h-[clamp(600px,71vw,1024px)] w-full overflow-hidden bg-white flex flex-col justify-center items-center"
        aria-labelledby="drishti-title"
      >
        <img
          ref={heroBgRef}
          className="absolute left-0 top-0 h-full w-full object-cover opacity-0"
          alt=""
          aria-hidden="true"
          src={heroBg}
        />
        <div
          ref={heroLeftTextRef}
          className="absolute top-[clamp(300px,35vw,512px)] left-[clamp(20px,3vw,44px)] font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-0"
        >
          FEST UNLIKE ANY OTHER
        </div>
        <img
          ref={heroLine1Ref}
          className="hidden md:block absolute left-0 top-[clamp(320px,37vw,542px)] h-0.5 w-[clamp(150px,28vw,413px)]"
          alt=""
          aria-hidden="true"
          src={heroLine1}
        />
        <img
          ref={heroLine2Ref}
          className="hidden md:block absolute right-[clamp(0px,10vw,200px)] top-[clamp(320px,37vw,542px)] h-0.5 w-[clamp(150px,28vw,408px)]"
          alt=""
          aria-hidden="true"
          src={heroLine2}
        />
        <div
          ref={heroRightTextRef}
          className="absolute top-[clamp(300px,35vw,512px)] right-[clamp(20px,3vw,44px)] text-right font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-0"
        >
          REWIND AND REJOICE
        </div>
        <h1
          ref={heroTitleRef}
          id="drishti-title"
          className="absolute top-[clamp(450px,51vw,736px)] font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(80px,12.5vw,180px)] font-normal leading-[normal] tracking-[0] text-white opacity-0"
        >
          DRISHTI
        </h1>
      </section>

      {/* ============ IDEAS DON'T ASK PERMISSION ============ */}
      <section
        className="relative min-h-[clamp(800px,113vw,1639px)] py-20 w-full overflow-hidden bg-black flex flex-col md:flex-row items-center justify-center gap-10"
        aria-labelledby="hero-title"
      >
        <div
          className="absolute bottom-[10%] left-[-10%] h-[25%] w-[40%] rotate-[18.51deg] rounded-full bg-[#d9d9d9] opacity-[0.24] blur-[clamp(100px,14vw,208.1px)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[65%] top-[15%] h-[32%] w-[56%] rotate-[-6.92deg] rounded-full bg-[#d9d9d9] opacity-[0.24] blur-[clamp(100px,14vw,208.1px)]"
          aria-hidden="true"
        />

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
            <img
              ref={ideasEmblemRef}
              className="w-[clamp(200px,29vw,421px)] aspect-[0.83] opacity-0"
              alt="Gold geometric innovation emblem"
              src={ideasEmblem}
            />
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
                className="all-unset z-10 flex h-[clamp(40px,7.2vw,104px)] w-[clamp(40px,7.2vw,104px)] cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform duration-300 hover:scale-110"
                onClick={() => handleWorkshopItemClick(item.title, index)}
                aria-label={`View ${item.title.toLowerCase()}`}
                aria-pressed={activeWorkshopItem === item.title}
              >
                <img
                  className="h-[77.84%] w-[77.84%]"
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
                    className="relative h-[clamp(400px,39.5vw,569px)] w-[clamp(280px,27.8vw,401px)] shrink-0 overflow-hidden border border-solid border-white opacity-0"
                  >
                    <img
                      className="absolute left-0 top-0 h-[calc(100%-68px)] w-full object-cover"
                      alt={`Featured event ${index + 1}`}
                      src={event.image}
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 left-0 flex h-[68px] w-full cursor-pointer items-center justify-between px-[13px] text-left border-t border-white bg-black/50 backdrop-blur-sm transition-colors duration-300 hover:bg-gold/20"
                      aria-label={`Register now for featured event ${index + 1}`}
                      onClick={() => handleRegistration(index)}
                    >
                      <span className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(20px,2.2vw,32px)] font-normal leading-8 tracking-[0] text-white">
                        REGISTER NOW
                      </span>
                      <img
                        className="h-[clamp(20px,2.2vw,32px)] w-[clamp(20px,2.2vw,32px)] -rotate-90 transition-transform duration-300 group-hover:rotate-0"
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
                className="flex h-12 w-12 rotate-[135deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50 transition-all duration-300 hover:bg-gold/20 hover:border-gold"
                onClick={() => moveFeatured(-1)}
                disabled={featuredIndex === 0}
                aria-label="Previous featured events"
              >
                <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 -rotate-[45deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50 transition-all duration-300 hover:bg-gold/20 hover:border-gold"
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
          <div ref={aftermovieContainerRef} className="relative w-full aspect-[1415/850] mb-8 flex flex-col justify-end opacity-0">
            <video
              className="absolute left-0 top-0 h-full w-full object-cover opacity-80"
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
              className={`${image.className} object-cover opacity-0 rounded-lg md:rounded-none`}
              alt={`Gallery photo ${index + 1}`}
              src={image.src}
            />
          ))}
        </div>
      </section>

      {/* ============ READY TO BUILD THE FUTURE? ============ */}
      <section
        className="relative flex min-h-[clamp(800px,97vw,1404px)] py-[clamp(100px,14vw,201px)] w-full flex-col items-center bg-black px-4"
        aria-label="Registration call to action"
      >
        <p
          ref={ctaDrishtiRef}
          className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(64px,10.8vw,156px)] leading-none text-white text-center opacity-0"
        >
          DRISHTI
        </p>
        <div className="mt-[clamp(40px,6.8vw,98px)] w-full max-w-[715px] text-center overflow-hidden">
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
        <div ref={ctaBorderRef} className="w-full max-w-[514px] h-[2px] bg-[#ffc132] mt-[clamp(40px,6.3vw,91px)]" style={{ transformOrigin: "center" }} />
        <a
          ref={ctaButtonRef}
          href="#register"
          className="mt-8 flex h-[clamp(60px,7vw,103px)] w-full max-w-[514px] items-center justify-center rounded-[50px] border-2 border-solid border-[#ffc132] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-all duration-300 hover:bg-[#ffc132]/10 hover:scale-105 active:scale-95 opacity-0"
        >
          <span className="bg-gradient-to-b from-[#ffc746] via-[52.404%] via-[#ffd779] to-[#8d6200] bg-clip-text text-center font-['Clash_Display-Medium',Helvetica] text-[clamp(24px,2.7vw,40px)] leading-[normal] text-transparent">
            Register Now
          </span>
        </a>
      </section>

      <Footer />
    </main>
  );
}

export default Home;

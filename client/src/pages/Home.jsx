import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ---- Hero (Wireframe - 1) ----
const heroBg = "/home/drishti-take-1.png";
const heroLogo = "/home/dishti-logo.png";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";

// ---- Ideas Don't Ask Permission (Wireframe - 4) ----
const ideasEmblem = "/home/ideas-emblem.png";
const ideasVectorLine = "/home/ideas-vector-line.svg";

// ---- Event Categories (Wireframe - 6) ----
const categoriesPhoto = "/home/categories-photo.png";
const arrowDownRight = "/home/arrow-down-right.svg";

// ---- Featured Events (Wireframe - 5) ----
const featuredEventPoster = "/home/featured-event-poster.png";

// ---- Aftermovie (Wireframe - 3) ----
const aftermovieVideo = "/home/aftermovie.mp4";
const aftermovieLogo = "/home/aftermovie-logo.png";
const aftermovieLine = "/home/aftermovie-line.svg";

// ---- Gallery (Wireframe - 7) ----
const galleryImage1 = "/home/gallery-1.png";
const galleryImage2 = "/home/gallery-2.png";
const galleryImage3 = "/home/gallery-3.png";
const galleryImage4 = "/home/gallery-4.png";
const galleryImage5 = "/home/gallery-5.png";

const coreValues = ["INNOVATION", "FUTURE", "COLLABORATION", "EXCELLANCE", "LEGACY"];

// Removed hardcoded textOffset, top, left. Rely on bounding box.
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
  const [carouselStep, setCarouselStep] = useState(412); // Fallback step
  
  const categoryImageRef = useRef(null);
  const categoryListRef = useRef(null);
  const itemRefs = useRef([]);
  const carouselCardRef = useRef(null);
  const carouselContainerRef = useRef(null);

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

  // Reveal + tilt the category photo in on hover/focus, reverse it on leave/blur.
  useEffect(() => {
    const el = categoryImageRef.current;
    if (!el || !categoryListRef.current) return;

    // Do not animate or show preview on mobile devices
    if (window.innerWidth < 768) return;

    gsap.killTweensOf(el);

    if (hoveredCategoryIndex !== null && itemRefs.current[hoveredCategoryIndex]) {
      const itemEl = itemRefs.current[hoveredCategoryIndex];
      const listRect = categoryListRef.current.getBoundingClientRect();
      const sectionRect = categoryListRef.current.parentElement.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      const arrowButtonWidth = itemEl.lastElementChild?.getBoundingClientRect().width ?? 0;
      const imageWidth = el.getBoundingClientRect().width;

      // Calculate relative position within the category container
      const top = itemRect.top - listRect.top + (itemRect.height / 2) - 150; // offset visually
      const preferredLeft = itemRect.left - sectionRect.left + (itemRect.width / 2) + 150;
      const maxLeft = listRect.right - sectionRect.left - arrowButtonWidth - 24 - imageWidth;
      const left = Math.min(preferredLeft, maxLeft);
      
      const { rotate: targetRotate } = workshopItems[hoveredCategoryIndex];
      
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.85, rotate: 0, top, left },
        {
          opacity: 1,
          scale: 1,
          rotate: targetRotate,
          top,
          left,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        rotate: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [hoveredCategoryIndex]);

  // Responsive Carousel Math
  useEffect(() => {
    if (!carouselCardRef.current || !carouselContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Compute the actual width + gap (gap is 11px as per original layout, we can read actual width)
        const width = entry.borderBoxSize?.[0]?.inlineSize || entry.target.offsetWidth;
        setCarouselStep(width + 11);
      }
    });
    observer.observe(carouselCardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRegistration = (eventIndex) => {
    window.dispatchEvent(
      new CustomEvent("featured-event-registration", {
        detail: { eventIndex },
      }),
    );
  };

  const moveFeatured = (direction) => {
    setFeaturedIndex((current) =>
      Math.min(featuredEvents.length - 1, Math.max(0, current + direction)),
    );
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* ============ HERO (Wireframe - 1) ============ */}
      <section
        className="relative h-[clamp(600px,71vw,1024px)] w-full overflow-hidden bg-white flex flex-col justify-center items-center"
        aria-labelledby="drishti-title"
      >
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          alt=""
          aria-hidden="true"
          src={heroBg}
        />
        <div className="absolute top-[clamp(300px,35vw,512px)] left-[clamp(20px,3vw,44px)] font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-60">
          FEST UNLIKE ANY OTHER
        </div>
        <img
          className="hidden md:block absolute left-0 top-[clamp(320px,37vw,542px)] h-0.5 w-[clamp(150px,28vw,413px)]"
          alt=""
          aria-hidden="true"
          src={heroLine1}
        />
        <img
          className="hidden md:block absolute right-[clamp(0px,10vw,200px)] top-[clamp(320px,37vw,542px)] h-0.5 w-[clamp(150px,28vw,408px)]"
          alt=""
          aria-hidden="true"
          src={heroLine2}
        />
        <div className="absolute top-[clamp(300px,35vw,512px)] right-[clamp(20px,3vw,44px)] text-right font-['Space_Grotesk-Regular',Helvetica] text-[clamp(10px,1.1vw,16px)] font-normal leading-[normal] tracking-[0] text-white opacity-60">
          REWIND AND REJOICE
        </div>
        <h1
          id="drishti-title"
          className="absolute top-[clamp(450px,51vw,736px)] font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(80px,12.5vw,180px)] font-normal leading-[normal] tracking-[0] text-white"
        >
          DRISHTI
        </h1>
      </section>

      {/* ============ IDEAS DON'T ASK PERMISSION (Wireframe - 4) ============ */}
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
                  className={`font-['Space_Grotesk-Regular',Helvetica] text-[clamp(14px,1.5vw,22px)] font-normal leading-none tracking-[0] text-white`}
                  key={value}
                >
                  {value}
                </li>
              ))}
            </ul>
          </aside>
          
          <img
            className="hidden md:block absolute left-[20%] top-0 h-[263px] w-0.5 z-10"
            alt=""
            aria-hidden="true"
            src={ideasVectorLine}
          />

          <div className="flex flex-col items-center justify-center w-full gap-10 mb-10 relative z-10">
            <img
              className="w-[clamp(200px,29vw,421px)] aspect-[0.83]"
              alt="Gold geometric innovation emblem"
              src={ideasEmblem}
            />
          </div>

          <div
            id="hero-title"
            className="w-full max-w-[1062px] text-center bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(48px,6.6vw,96px)] font-normal leading-[1.2] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] relative z-10"
          >
            IDEAS DON&apos;T ASK PERMISSION
          </div>
          
          <p className="mt-[clamp(40px,10vw,150px)] w-full max-w-[1019px] text-center font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,1.6vw,24px)] font-normal leading-[1.4] tracking-[0] text-white relative z-10">
            Lorem ipsum dolor sit amet consectetur. Leo in velit tristique morbi
            facilisi facilisis vestibulum in. Odio rutrum eu nisi tempor sit vel.
            Sed dignissim viverra interdum nunc at diam turpis. Integer odio risus
            aliquam maecenas porttitor.
          </p>
        </div>
      </section>

      {/* ============ EVENT CATEGORIES (Wireframe - 6) ============ */}
      <section className="relative min-h-[clamp(600px,86vw,1250px)] w-full bg-black flex items-center justify-center py-20 overflow-hidden" aria-label="Event categories">
        <div
          ref={categoryListRef}
          className="relative flex w-full max-w-[1440px] px-[clamp(20px,5vw,71px)] flex-col items-start gap-[clamp(20px,3.2vw,47px)] z-10"
          aria-label="Available event categories"
        >
          {workshopItems.map((item, index) => (
            <div

            
              key={item.title}
              ref={(el) => (itemRefs.current[index] = el)}
              className="relative min-h-[clamp(80px,7.8vw,113px)] w-full self-stretch border-b border-white flex items-center justify-between group"
              onMouseEnter={() => handleCategoryInteraction(index)}
              onMouseLeave={() => handleCategoryLeave(index)}
              onFocus={() => window.innerWidth >= 768 && handleCategoryInteraction(index)}
              onBlur={() => window.innerWidth >= 768 && handleCategoryLeave(index)}
            >
              <button
                type="button"
                className={`all-unset text-left z-10 cursor-pointer bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,4.4vw,64px)] font-normal leading-[normal] tracking-[0] text-transparent [-webkit-text-fill-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-transform duration-300 ${hoveredCategoryIndex === index ? '-translate-x-4 md:-translate-x-8' : ''}`}
                onClick={() => handleWorkshopItemClick(item.title, index)}
                aria-pressed={activeWorkshopItem === item.title}
              >
                {item.title}
              </button>
              <button
                type="button"
                className="all-unset z-10 flex h-[clamp(40px,7.2vw,104px)] w-[clamp(40px,7.2vw,104px)] cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          alt={
            hoveredCategoryIndex !== null
              ? `${workshopItems[hoveredCategoryIndex].title} preview`
              : ""
          }
          aria-hidden={hoveredCategoryIndex === null}
          src={workshopItems[hoveredCategoryIndex ?? 0].image}
        />
      </section>

      {/* ============ FEATURED EVENTS (Wireframe - 5) ============ */}
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
              id="featured-events-heading"
              className="bg-[linear-gradient(143deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0.3)_100%)] bg-clip-text text-[clamp(48px,6.6vw,96px)] font-normal leading-[1.2] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-['Bietro_DEMO-Regular',Helvetica]"
            >
              FEATURED EVENTS
            </h2>
            <p className="mt-[clamp(10px,2vw,30px)] font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,1.5vw,22px)] font-normal leading-[1.4] tracking-[0] text-white">
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
                  ref={index === 0 ? carouselCardRef : null}
                  className="relative h-[clamp(400px,39.5vw,569px)] w-[clamp(280px,27.8vw,401px)] shrink-0 overflow-hidden border border-solid border-white"
                >
                  <img
                    className="absolute left-0 top-0 h-[calc(100%-68px)] w-full object-cover"
                    alt={`Featured event ${index + 1}`}
                    src={event.image}
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 left-0 flex h-[68px] w-full cursor-pointer items-center justify-between px-[13px] text-left border-t border-white bg-black/50 backdrop-blur-sm"
                    aria-label={`Register now for featured event ${index + 1}`}
                    onClick={() => handleRegistration(index)}
                  >
                    <span className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(20px,2.2vw,32px)] font-normal leading-8 tracking-[0] text-white">
                      REGISTER NOW
                    </span>
                    <img
                      className="h-[clamp(20px,2.2vw,32px)] w-[clamp(20px,2.2vw,32px)] -rotate-90"
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
                className="flex h-12 w-12 rotate-[135deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50"
                onClick={() => moveFeatured(-1)}
                disabled={featuredIndex === 0}
                aria-label="Previous featured events"
              >
                <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 -rotate-[45deg] items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30 pointer-events-auto bg-black/50"
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

      {/* ============ AFTERMOVIE (Wireframe - 3) ============ */}
      <section className="relative min-h-[clamp(600px,71vw,1024px)] w-full bg-black flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[1415px] flex flex-col items-center justify-center px-[clamp(20px,4vw,60px)]">
          <div className="relative w-full aspect-[1415/850] mb-8 flex flex-col justify-end">
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
                <p className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(32px,5vw,58px)] leading-[normal] text-white m-0">
                  DRISHTI &lsquo;24
                </p>
                <img
                  className="pointer-events-none h-[clamp(32px,4vw,45px)] w-auto object-cover absolute left-1/2 -translate-x-1/2"
                  alt="Drishti"
                  src={aftermovieLogo}
                />
                <p className="whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[clamp(32px,5vw,58px)] leading-[normal] text-white m-0">
                  AFTERMOVIE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GALLERY (Wireframe - 7) ============ */}
      <section className="relative min-h-[clamp(600px,71vw,1024px)] w-full bg-black flex items-center justify-center" aria-label="Event gallery">
        <div className="relative w-full max-w-[1415px] min-h-[600px] md:h-[999px] flex flex-col md:block items-center gap-4 py-10 px-[20px] overflow-hidden">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              className={`${image.className} object-cover opacity-80 rounded-lg md:rounded-none`}
              alt={`Gallery photo ${index + 1}`}
              src={image.src}
            />
          ))}
        </div>
      </section>

      {/* ============ READY TO BUILD THE FUTURE? (Wireframe - 8) ============ */}
      <section
        className="relative flex min-h-[clamp(800px,97vw,1404px)] py-[clamp(100px,14vw,201px)] w-full flex-col items-center bg-black px-4"
        aria-label="Registration call to action"
      >
        <p className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(64px,10.8vw,156px)] leading-none text-white text-center">
          DRISHTI
        </p>
        <div className="mt-[clamp(40px,6.8vw,98px)] w-full max-w-[715px] text-center font-['Clash_Display-Medium',Helvetica] text-[clamp(40px,5vw,72px)] leading-[normal] tracking-[1.44px] text-white">
          <p className="m-0">READY TO BUILD</p>
          <p className="m-0">THE FUTURE?</p>
        </div>
        <a
          href="#register"
          className="mt-[clamp(40px,6.3vw,91px)] flex h-[clamp(60px,7vw,103px)] w-full max-w-[514px] items-center justify-center rounded-[50px] border-2 border-solid border-[#ffc132] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-transform hover:scale-105 active:scale-95"
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

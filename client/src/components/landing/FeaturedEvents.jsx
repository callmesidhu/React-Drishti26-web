import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dakshaEventsData, competitionsData, workshopsData } from "../../data/eventsData";

gsap.registerPlugin(ScrollTrigger);

const arrowDownRight = "/home/arrow-down-right.svg";

const featuredEvents = [
 dakshaEventsData[0],
 competitionsData[0],
 competitionsData[1],
 workshopsData[0],
];

export default function FeaturedEvents({ onEventClick }) {
 const [featuredIndex, setFeaturedIndex] = useState(0);
 const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
 const [hasManuallyNavigated, setHasManuallyNavigated] = useState(false);

 const featuredHeadingRef = useRef(null);
 const featuredParagraphRef = useRef(null);
 const containerRef = useRef(null);

 const moveFeatured = (direction) => {
 setFeaturedIndex((current) => {
 const next = current + direction;
 // Loop around
 if (next < 0) return featuredEvents.length - 1;
 if (next >= featuredEvents.length) return 0;
 return next;
 });
 };

 useEffect(() => {
 const ctx = gsap.context(() => {
 // Entrance animations removed to prevent visibility bugs with upstream pinned sections.
 // The 3D Coverflow interactions provide enough dynamism.
 });

 return () => ctx.revert();
 }, []);

 useEffect(() => {
 if (isAutoScrollPaused || hasManuallyNavigated) return;
 
 const interval = setInterval(() => {
 moveFeatured(1);
 }, 1500);
 
 return () => clearInterval(interval);
 }, [isAutoScrollPaused, hasManuallyNavigated]);

 return (
 <section
 className="relative h-[100svh] min-h-[500px] max-h-[1080px] w-full overflow-hidden bg-black py-6 md:py-8 flex flex-col justify-center"
 aria-labelledby="featured-events-heading"
 >


 <div className="w-full max-w-[1440px] px-[clamp(20px,5vw,107px)] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 h-full pt-24 lg:pt-0 pb-10">
 
 {/* Left Side: Header Section */}
 <div className="flex flex-col gap-6 w-full lg:w-[40%] flex-shrink-0 z-20">
 <div>
 <h2
 ref={featuredHeadingRef}
 id="featured-events-heading"
 className="bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text text-[clamp(48px,6.6vw,96px)] font-normal leading-[1.1] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-['Bietro_DEMO-Regular',Helvetica]"
 >
 FEATURED<br/>EVENTS
 </h2>
 <p
 ref={featuredParagraphRef}
 className="mt-[clamp(10px,2vw,30px)] font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,1.5vw,22px)] font-normal leading-[1.4] text-white/80 max-w-[400px]"
 >
 Discover the flagship experiences of Drishti 2026. 
 Swipe through our premier competitions and workshops.
 </p>
 </div>

 {/* Navigation Controls */}
 <div className="flex items-center gap-4 mt-4 lg:mt-8">
 <button
 type="button"
 className="flex h-14 w-14 rotate-[135deg] items-center justify-center border border-white/20 bg-black transition-all duration-300 hover:border-[#D4AF37] hover:scale-110 hover:rotate-[180deg]"
 onClick={() => {
 moveFeatured(-1);
 setHasManuallyNavigated(true);
 }}
 aria-label="Previous featured event"
 >
 <img className="h-6 w-6 opacity-80" src={arrowDownRight} alt="" aria-hidden="true" />
 </button>
 <button
 type="button"
 className="flex h-14 w-14 -rotate-[45deg] items-center justify-center border border-white/20 bg-black transition-all duration-300 hover:border-[#D4AF37] hover:scale-110 hover:rotate-0"
 onClick={() => {
 moveFeatured(1);
 setHasManuallyNavigated(true);
 }}
 aria-label="Next featured event"
 >
 <img className="h-6 w-6 opacity-80" src={arrowDownRight} alt="" aria-hidden="true" />
 </button>
 </div>
 </div>

 {/* Right Side: 3D Coverflow Container */}
 <div 
 ref={containerRef}
 className="relative w-full lg:w-[60%] flex-1 h-[50vh] lg:h-[80vh] flex items-center justify-center [perspective:1200px]"
 onMouseEnter={() => setIsAutoScrollPaused(true)}
 onMouseLeave={() => setIsAutoScrollPaused(false)}
 >
 {featuredEvents.map((event, index) => {
 // Calculate distance from center (with wrapping logic for smooth carousel)
 let diff = index - featuredIndex;
 const length = featuredEvents.length;
 if (diff > Math.floor(length / 2)) diff -= length;
 if (diff < -Math.floor(length / 2)) diff += length;

 // Styles based on distance
 const isActive = diff === 0;
 const absDiff = Math.abs(diff);
 
 // 3D positioning
 const translateX = diff * (window.innerWidth < 1024 ? 120 : 300); 
 const translateZ = isActive ? 0 : -150 - (absDiff * 150);
 const rotateY = isActive ? 0 : diff > 0 ? -30 : 30;
 const opacity = isActive ? 1 : Math.max(0, 1 - (absDiff * 0.3));
 const zIndex = 100 - absDiff;

 return (
 <article
 key={index}
 className="absolute h-full aspect-[3/4] max-h-[85vh] overflow-hidden group cursor-pointer transition-colors duration-500"
 style={{ 
 transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
 opacity: opacity,
 zIndex: zIndex,
 transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
 border: isActive ? "2px solid #D4AF37" : "1px solid rgba(255,255,255,0.1)",
 backgroundColor: "#050505"
 }}
 onClick={() => {
 if (isActive) {
 onEventClick(index);
 } else {
 setFeaturedIndex(index);
 setHasManuallyNavigated(true);
 }
 }}
 onMouseEnter={(e) => {
 if (isActive) {
 e.currentTarget.style.transform = `translateX(${translateX}px) translateZ(50px) rotateY(${rotateY}deg) scale(1.02)`;
 }
 }}
 onMouseLeave={(e) => {
 if (isActive) {
 e.currentTarget.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
 }
 }}
 >
 {/* Event Image */}
 <img
 className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
 alt={`Featured event ${index + 1}`}
 src={event.image || "https://placehold.co/600x800/111/fff?text=EVENT"}
 style={{
 filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.6) brightness(0.6)",
 transition: "filter 0.8s ease"
 }}
 />

 {/* Solid overlay for inactive cards */}
 {!isActive && (
 <div className="absolute inset-0 bg-black/20" />
 )}

 {/* Sharp UI overlay for active card */}
 {isActive && (
 <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent">
 <button
 type="button"
 className="flex h-[60px] w-full items-center justify-between px-6 text-left border border-[#D4AF37] bg-black group/btn transition-all duration-300"
 aria-label={`View details for featured event ${index + 1}`}
 onClick={(e) => {
 e.stopPropagation();
 onEventClick(index);
 }}
 >
 <span className="font-['Space_Grotesk-Regular',Helvetica] text-[clamp(16px,2vw,20px)] font-bold tracking-[0.1em] text-[#D4AF37] uppercase transition-colors duration-300">
 View Details
 </span>
 <img
 className="h-6 w-6 -rotate-90 group-hover/btn:rotate-0 transition-transform duration-300"
 alt=""
 aria-hidden="true"
 src={arrowDownRight}
 style={{ filter: "brightness(0) saturate(100%) invert(80%) sepia(35%) saturate(735%) hue-rotate(352deg) brightness(91%) contrast(92%)" /* #D4AF37 */ }}
 />
 </button>
 </div>
 )}
 </article>
 );
 })}
 </div>
 </div>
 </section>
 );
}

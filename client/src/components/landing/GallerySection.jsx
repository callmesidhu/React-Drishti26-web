import DomeGallery from "../DomeGallery";

const isCoarsePointer =
	typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const heroBg = "/home/drishti-take-1.webp";
const categoriesPhoto = "/home/dome/25krobo.jpeg";
const galleryImage1 = "/home/dome/25krobo.jpeg";
const galleryImage2 = "/home/dome/50krobo.jpeg";
const galleryImage3 = "/home/dome/aisummit.jpeg";
const galleryImage4 = "/home/dome/biennale.jpeg";
const galleryImage5 = "/home/dome/drun.jpeg";
const galleryImage6 = "/home/dome/robosoccer.jpeg";

const drishtiGalleryImages = [
 { src: galleryImage1, alt: "Robowar — 25K Prize Pool" },
 { src: galleryImage2, alt: "Robowar — 50K Prize Pool" },
 { src: galleryImage3, alt: "AI Summit" },
 { src: galleryImage4, alt: "Biennale" },
 { src: galleryImage5, alt: "D'Run Marathon" },
 { src: galleryImage6, alt: "Robosoccer" },
 { src: categoriesPhoto, alt: "Drishti '26 Competitions" },
 { src: galleryImage3, alt: "AI Summit" },
 { src: "/home/featured-event-poster.webp", alt: "Featured Events & Keynotes" },
 { src: "/proshow/proshowgrid.webp", alt: "Live Pro Shows Night" },
 { src: "/home/sharktank.jpeg", alt: "Daksha Ideation & Pitch" },
 { src: heroBg, alt: "Drishti '26 Horizon" },
 { src: "/home/sharktank.jpeg", alt: "Daksha Ideation & Pitch" },
];

export default function GallerySection() {
 return (
 <section className="relative z-20 w-full bg-black flex flex-col items-center justify-center pt-16 md:pt-24 pb-8 overflow-hidden border-y border-white/5" aria-label="Event gallery">
 {/* Title placed directly above the dome */}
 <div className="relative z-10 text-center px-4 mb-2 md:mb-4 pointer-events-none">
 <h2 className="font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,5vw,64px)] tracking-[0.05em] uppercase bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] leading-tight">
 EXPERIENCE DRISHTI
 </h2>
 </div>

 {/* 3D Dome Gallery Container */}
 <div className="relative h-[60svh] min-h-[400px] max-h-[620px] w-full md:h-[72vh] md:min-h-[560px] md:max-h-[860px]">
 <DomeGallery
 images={drishtiGalleryImages}
 fit={1}
 minRadius={420}
 maxVerticalRotationDeg={20}
 segments={20}
 grayscale={false}
 openedImageWidth="clamp(300px, 60vw, 520px)"
 openedImageHeight="clamp(300px, 60vw, 520px)"
 imageBorderRadius="18px"
 openedImageBorderRadius="24px"
 overlayBlurColor="#000000"
 scrollParallax={!isCoarsePointer}
 scrollParallaxAngle={110}
 />
 </div>

 <div className="mt-4 flex flex-col items-center gap-2 text-gold/60">
 <p className="font-['Space_Grotesk-Regular',Helvetica] text-xs uppercase tracking-[0.18em]">
 Scroll down to see more
 </p>
 <span
 className="h-2.5 w-2.5 rotate-45 border-b border-r border-gold/70"
 aria-hidden="true"
 />
 </div>
 </section>
 );
}

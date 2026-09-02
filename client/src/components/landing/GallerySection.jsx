import DomeGallery from "../DomeGallery";

const heroBg = "/home/drishti-take-1.webp";
const categoriesPhoto = "/home/gallery-1.webp";
const galleryImage1 = "/home/gallery-1.webp";
const galleryImage2 = "/home/gallery-2.webp";
const galleryImage3 = "/home/gallery-3.webp";
const galleryImage4 = "/home/gallery-4.webp";
const galleryImage5 = "/home/gallery-5.webp";

const drishtiGalleryImages = [
 { src: galleryImage1, alt: "Drishti Festival Stage & Atmosphere" },
 { src: galleryImage2, alt: "Tech Innovation & Robotics" },
 { src: galleryImage3, alt: "Atmosphere & Future Tech" },
 { src: galleryImage4, alt: "Workshops & Tech Sessions" },
 { src: galleryImage5, alt: "Pro Shows Musical Night" },
 { src: categoriesPhoto, alt: "Drishti '26 Competitions" },
 { src: "/home/aftermovie-bg.webp", alt: "Festival Lights & Crowds" },
 { src: "/home/featured-event-poster.webp", alt: "Featured Events & Keynotes" },
 { src: "/proshow/proshowgrid.webp", alt: "Live Pro Shows Night" },
 { src: "/daksha/shark-tank.webp", alt: "Daksha Ideation & Pitch" },
 { src: heroBg, alt: "Drishti '26 Horizon" },
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
 );
}

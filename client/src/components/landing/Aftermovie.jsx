import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aftermovieVideo = "/home/aftermovie.mp4";
const aftermovieLogo = "/home/aftermovie-logo.png";

export default function Aftermovie() {
  const aftermovieSectionRef = useRef(null);
  const aftermovieContainerRef = useRef(null);
  const aftermovieTitleLeftRef = useRef(null);
  const aftermovieTitleRightRef = useRef(null);
  const aftermovieLogoRef = useRef(null);
  const aftermovieGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aftermovieSectionRef} className="relative h-[100svh] min-h-[600px] w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Static Gold Gradient Grid Background */}
      <div 
        ref={aftermovieGridRef}
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)]"
        style={{
          WebkitMaskImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
          WebkitMaskSize: '60px 60px',
          maskImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
          maskSize: '60px 60px',
        }}
      />

      <div className="relative w-[92%] md:w-[84%] lg:w-[76%] max-w-[1020px] flex flex-col items-center justify-center px-[clamp(10px,2vw,24px)] z-10">
        <div ref={aftermovieContainerRef} className="relative w-full aspect-[1415/850] overflow-hidden rounded-none p-[1px] md:p-[2px] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)]">
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
  );
}

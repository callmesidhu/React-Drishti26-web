import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DrishTees() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const shirtRef = useRef(null);
  const baseRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image parallax is consistent
      gsap.fromTo(
        bgRef.current,
        { yPercent: -75 },
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      let mm = gsap.matchMedia();

      // DESKTOP ANIMATIONS
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          shirtRef.current,
          { y: 250 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
          }
        );
        gsap.fromTo(
          baseRef.current,
          { y: 100, xPercent: -50 },
          {
            y: -100,
            xPercent: -50,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
          }
        );
        gsap.fromTo(
          titleRef.current,
          { y: 300 },
          {
            y: -200,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', end: 'bottom top', scrub: 1 }
          }
        );
        gsap.fromTo(
          descRef.current,
          { y: 400 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: 'bottom top', scrub: 1.4 }
          }
        );
        gsap.fromTo(
          btnRef.current,
          { y: 500 },
          {
            y: -300,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'bottom top', scrub: 1.8 }
          }
        );
      });

      // MOBILE & TABLET ANIMATIONS
      mm.add("(max-width: 1023px)", () => {
        // Shirt and Base parallax animations removed on mobile to keep them visually locked together

        gsap.fromTo(
          titleRef.current,
          { y: 50 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', end: 'bottom top', scrub: 1 }
          }
        );
        gsap.fromTo(
          descRef.current,
          { y: 80 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: 'bottom top', scrub: 1.4 }
          }
        );
        gsap.fromTo(
          btnRef.current,
          { y: 100 },
          {
            y: -70,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', end: 'bottom top', scrub: 1.8 }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-visible py-10 sm:py-12 lg:py-16 xl:py-20">
      {/* Top fade overlay to smoothly blend background images moving under the top boundary */}
      <div className="absolute inset-x-0 top-0 z-10 h-32 w-full bg-gradient-to-b from-black to-transparent pointer-events-none" aria-hidden="true" />
      {/* Bottom fade overlay to smoothly blend the section ending into the next section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 w-full bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden="true" />
      <img
        ref={bgRef}
        src="/home/circle-half.png"
        alt=""
 aria-hidden="true"
 loading="lazy"
 decoding="async"
        className="hidden md:block pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-[90%] md:w-[75%] lg:w-[50%] max-w-[none] -translate-y-1/2 opacity-30"
        style={{ 
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)'
        }}
      />
      {/* Mobile-only section backdrop: bottom-anchored behind the copy so it clears the shirt area */}
      <img
        src="/home/circle-half.png"
        alt=""
 aria-hidden="true"
 loading="lazy"
        decoding="async"
        className="md:hidden pointer-events-none absolute inset-x-0 bottom-[-6%] z-0 h-[68%] w-full object-cover object-center opacity-30 select-none"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 26%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 26%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 overflow-visible z-10 relative">
        <div className="relative mt-4 grid items-end gap-4 overflow-visible lg:mt-8 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="relative mx-auto flex h-[300px] w-full max-w-[620px] items-end justify-center sm:h-[380px] md:h-[500px] xl:h-[620px]">
            {/* The base is now z-20 to be on top of the tshirt */}
            <div ref={baseRef} className="hidden md:block absolute bottom-[-20px] lg:bottom-[-12px] left-1/2 w-[86%] max-w-[440px] -translate-x-1/2 object-contain z-20">
              <img
                src="/home/tshirt-base.png"
                alt=""
 aria-hidden="true"
 className="w-full h-auto"
 loading="lazy"
 decoding="async"
                style={{ animation: 'float-base 6.5s ease-in-out infinite' }}
              />
            </div>
            {/* The video is z-10 so it sits behind the front edge of the base */}
            <div ref={shirtRef} className="relative z-10 h-[78%] w-auto max-w-[520px] pointer-events-none mb-8 md:mb-0">
              <video
                src="/home/drishtee.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Drishtee T-shirt promotional video"
                className="w-full h-full object-contain"
                style={{ transform: 'translateY(-160px)', animation: 'float-shirt 6.5s ease-in-out infinite' }}
              />
            </div>
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-visible sm:min-h-[300px] md:min-h-[360px] lg:min-h-[500px]">
            <div className="relative z-10 flex w-full max-w-[560px] flex-col items-start justify-center px-2 text-left lg:px-0 lg:pr-10">
              <h2 ref={titleRef} className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(28px,4vw,62px)] font-normal leading-[0.9] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
                GRAB YOUR TEES NOW!!
              </h2>

              <p ref={descRef} className="mt-4 max-w-[460px] text-[0.85rem] leading-relaxed text-[#f3e7c9] sm:text-[0.95rem] lg:text-[1.02rem]">
                The future is never built by wiping away what came before. It grows by layering fresh innovation over the blueprints of our history, carrying forward the weight of human effort beneath every modern breakthrough. At CET, that same spirit lives in the way students come together, build, adapt, and keep pushing the campus forward, one idea, one solution, and one change at a time. We do not just watch the future unfold. We step into the unknown, look deeper, and turn the unseen into real progress.
              </p>

              <div ref={btnRef} className="mt-6">
                <a
                  href="https://forms.gle/qDhGRZQ96gBieu1D9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#d4af37]/70 bg-[linear-gradient(180deg,#e7c567_0%,#d4af37_45%,#b98b1b_100%)] px-8 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-[#0d0d0d] transition-transform duration-200 hover:scale-[1.02]"
                >
                  Get Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float-shirt {
          0%, 100% { transform: translateY(-25%); }
          50% { transform: translateY(-32%); }
        }

        @keyframes float-base {
          0%, 100% { transform: translateY(0%); }
          50% { transform: translateY(-5%); }
        }
      `}</style>
    </section>
  );
}

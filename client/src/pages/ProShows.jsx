import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Imports for desktop landscape grid and mobile portrait version
import ProShowGrid from '/proshow/proshowgrid.jpeg'
import ProShowMobile from '/proshow/proshow.png'

const artistName = 'Shaan Rahman'

const faqs = [
  {
    q: 'How do I obtain entry passes for the ProShow?',
    a: 'ProShow passes can be booked online via the official registration link or collected from the Drishti Registration Desk on campus. Passes are linked to your Drishti ID.',
  },
  {
    q: 'Can non-KSIT students attend the ProShow?',
    a: 'Yes! The ProShow is open to students from all colleges with a valid college ID card and an official Drishti ProShow pass.',
  },
  {
    q: 'Are there VIP / Front-Row access options?',
    a: 'Limited VIP passes are available for registered team participants and competition winners. Check the registration portal for upgrade availability.',
  },
  {
    q: 'What items are prohibited inside the concert venue?',
    a: 'Prohibited items include professional cameras, tripods, glass bottles, food items, sharp objects, and laser pointers. Standard bags are subject to security search.',
  },
]

function ProShowsPage({ embedded = false }) {
  const [openFaq, setOpenFaq] = useState(null)

  const pinWrapperRef = useRef(null)
  const headerRef = useRef(null)
  const h1Ref = useRef(null)
  const artistRef = useRef(null)
  const stageAreaRef = useRef(null)
  const cardWrapperRef = useRef(null)
  const cardInnerRef = useRef(null)
  const shadowRef = useRef(null)
  const glowRef = useRef(null)
  const particlesRef = useRef([])
  const faqSectionRef = useRef(null)

  useEffect(() => {
    if (h1Ref.current) applyLetterGradient(h1Ref.current)
    if (artistRef.current) applyLetterGradient(artistRef.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set Initial States
      gsap.set([headerRef.current, artistRef.current, faqSectionRef.current], {
        opacity: 0,
        y: 20,
      })

      gsap.set(cardWrapperRef.current, {
        rotationX: 90,
        rotationY: 0,
        rotationZ: 0,
        x: 0,
        y: 60,
        z: -100,
        scale: 0.75,
        opacity: 1,
      })

      gsap.set(cardInnerRef.current, { rotationY: 0 })
      gsap.set(shadowRef.current, { opacity: 0.8, scale: 0.7, x: 0 })
      gsap.set(glowRef.current, { opacity: 0.3, scale: 0.6 })

      particlesRef.current.forEach((particle) => {
        if (!particle) return
        gsap.set(particle, {
          x: (Math.random() - 0.5) * 500,
          y: gsap.utils.random(-150, 150),
          scale: gsap.utils.random(0.3, 1.2),
          opacity: gsap.utils.random(0.4, 0.95),
        })
      })

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      scrollTl.to(
        particlesRef.current,
        {
          y: '-=100',
          stagger: 0.02,
          duration: 1,
        },
        0
      )

      scrollTl.to(
        cardWrapperRef.current,
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          duration: 3,
          ease: 'power2.inOut',
        },
        0
      )

      scrollTl.to(
        shadowRef.current,
        {
          opacity: 0,
          scale: 0.2,
          duration: 2,
        },
        1
      )

      scrollTl.to(
        cardInnerRef.current,
        {
          rotationY: 180,
          duration: 3,
          ease: 'power2.inOut',
        },
        '>'
      )

      scrollTl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 1.2,
          duration: 1.5,
        },
        '<=1.5'
      )

      scrollTl
        .to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
          },
          '<=1'
        )
        .to(
          artistRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
          },
          '<+0.2'
        )
        .to(
          faqSectionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
          },
          '<+0.2'
        )

      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    }, pinWrapperRef)

    const refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(refreshRaf)
      ctx.revert()
    }
  }, [])

  return (
    <div className={`relative min-h-svh w-full text-gold ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="proshows" />}

      {/* Pinned Scroll Section with explicit Navbar clearance */}
      <div ref={pinWrapperRef} className="relative w-full h-screen flex flex-col items-center justify-between pt-24 lg:pt-28 pb-6 overflow-hidden">
        
        {/* Page Header (Cleared from Navbar overlap) */}
        <header ref={headerRef} className="z-10 px-[clamp(16px,4vw,40px)] text-center opacity-0">
          <h1
            ref={h1Ref}
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-[clamp(32px,5.5vw,64px)] font-bold uppercase leading-[0.95] tracking-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]"
          >
            Pro Show
          </h1>
        </header>

        {/* 3D Stage Area */}
        <main ref={stageAreaRef} className="relative w-full max-w-[1200px] px-4 my-auto flex flex-col items-center justify-center">
          
          {/* Ambient Glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-[400px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,rgba(0,0,0,0)_70%)] blur-3xl"
          />

          {/* Ground Shadow */}
          <div
            ref={shadowRef}
            className="pointer-events-none absolute bottom-2 h-[50px] w-[300px] lg:w-[550px] rounded-[100%] bg-black/95 blur-xl"
          />

          {/* Golden Spangles */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => { particlesRef.current[i] = el }}
                className="absolute h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_#D4AF37]"
              />
            ))}
          </div>

          {/* 3D Stage Perspective Wrapper: Scaled down slightly for laptop viewports */}
          <div className="perspective-[1400px] z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[780px]">
            <div
              ref={cardWrapperRef}
              className="transform-style-3d relative w-full rounded-2xl"
            >
              {/* Flip Container */}
              <div
                ref={cardInnerRef}
                className="transform-style-3d relative w-full h-[460px] sm:h-[500px] lg:h-auto lg:aspect-[16/9] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* BACK OF CARD: Metallic Gold */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#2a2208] to-[#080808] border border-gold/40 shadow-2xl"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg) translateZ(1px)',
                    willChange: 'transform'
                  }}
                />

                {/* FRONT OF CARD: Revealed Responsive Image */}
                <div 
                  className="absolute inset-0 rounded-2xl overflow-hidden bg-[#080808] border border-gold/30"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(1px)',
                    willChange: 'transform'
                  }}
                >
                  {/* Laptop Viewport (proshowgrid.jpeg) */}
                  <img
                    src={ProShowGrid}
                    alt="Shaan Rahman Live in Concert - Desktop"
                    className="hidden lg:block h-full w-full object-cover rounded-2xl relative z-10"
                  />
                  
                  {/* Mobile/Tablet Viewport (proshow.png) */}
                  <img
                    src={ProShowMobile}
                    alt="Shaan Rahman Live in Concert - Mobile"
                    className="block lg:hidden h-full w-full object-cover rounded-2xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Artist Name */}
        {/* Artist Name */}
        <div 
          ref={artistRef}
          className="z-10 text-center opacity-0"
        >
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-[clamp(24px,4vw,44px)] font-bold uppercase tracking-wider text-gold-gradient drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            {artistName}
          </h2>
        </div>
      </div>

      {/* FAQ Section */}
      <section ref={faqSectionRef} className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)] py-20 opacity-0">
        <h2
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="text-center text-3xl font-bold uppercase tracking-tight text-gold-gradient"
        >
          ProShow Guidelines & FAQ
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-400 ease-out ${
                  isOpen
                    ? 'border-[#FFDB86]/60 bg-black/75 shadow-[0_4px_25px_rgba(212,175,55,0.15)]'
                    : 'border-gold/20 bg-black/40 hover:border-gold/40 hover:bg-black/55'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors duration-300 select-none"
                  aria-expanded={isOpen}
                >
                  <span 
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                    className={`text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isOpen ? 'text-[#FFDB86]' : 'text-white'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span 
                    className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen 
                        ? 'rotate-45 border-[#FFDB86] bg-gold/20 text-[#FFDB86] shadow-[0_0_12px_rgba(255,219,134,0.4)]' 
                        : 'rotate-0 border-gold/30 bg-black/30 text-gold hover:border-gold/60'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gold/10 px-5 pb-5 pt-3 md:px-6 md:pb-6 md:pt-3 text-xs md:text-sm leading-relaxed text-white/70">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {!embedded && <Footer />}
    </div>
  )
}

export default ProShowsPage

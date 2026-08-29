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
        y: 20 
      })

      gsap.set(cardWrapperRef.current, {
        rotationX: 90,
        rotationY: 28,
        rotationZ: 0,
        x: 100,
        y: 200,
        z: -180,
        scale: 0.65,
        opacity: 0,
      })

      gsap.set(cardInnerRef.current, { rotationY: 0 })
      gsap.set(shadowRef.current, { opacity: 0, scale: 0.7, x: 100 })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.4 })

      particlesRef.current.forEach((particle) => {
        if (!particle) return
        gsap.set(particle, {
          x: (Math.random() - 0.5) * 500,
          y: gsap.utils.random(-150, 150),
          scale: gsap.utils.random(0.3, 1.2),
          opacity: 0,
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

      scrollTl.to([cardWrapperRef.current, shadowRef.current], {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
      })

      scrollTl.to(
        particlesRef.current,
        {
          opacity: (i) => gsap.utils.random(0.4, 0.95),
          y: '-=100',
          stagger: 0.02,
          duration: 1,
        },
        '<=0.2'
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
        '>'
      )

      scrollTl.to(
        shadowRef.current,
        {
          opacity: 0,
          scale: 0.2,
          duration: 2,
        },
        '<=1'
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
    }, pinWrapperRef)

    return () => ctx.revert()
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
            className="text-[clamp(32px,5.5vw,64px)] font-bold uppercase leading-[0.95] tracking-tight drop-shadow-[0_0_30px_rgba(225,157,0,0.35)]"
          >
            Pro Show
          </h1>
        </header>

        {/* 3D Stage Area */}
        <main ref={stageAreaRef} className="relative w-full max-w-[1200px] px-4 my-auto flex flex-col items-center justify-center">
          
          {/* Ambient Glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-[400px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(225,157,0,0.35)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-0"
          />

          {/* Ground Shadow */}
          <div
            ref={shadowRef}
            className="pointer-events-none absolute bottom-2 h-[50px] w-[300px] lg:w-[550px] rounded-[100%] bg-black/95 blur-xl opacity-0"
          />

          {/* Golden Spangles */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => { particlesRef.current[i] = el }}
                className="absolute h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_#e19d00] opacity-0"
              />
            ))}
          </div>

          {/* 3D Stage Perspective Wrapper: Scaled down slightly for laptop viewports */}
          <div className="perspective-[1400px] z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[780px]">
            <div
              ref={cardWrapperRef}
              className="transform-style-3d relative w-full rounded-2xl opacity-0"
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
        <div 
          ref={artistRef}
          className="z-10 text-center opacity-0"
        >
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-[clamp(24px,4vw,44px)] font-bold uppercase tracking-wider text-gold-gradient drop-shadow-[0_0_20px_rgba(225,157,0,0.3)]"
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
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gold/20 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:border-gold/40"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span 
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                  className="text-sm font-semibold uppercase tracking-wider text-white"
                >
                  {faq.q}
                </span>
                <span className="ml-4 text-xl text-gold">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <div className="border-t border-gold/10 px-6 pb-6 pt-2 text-sm leading-relaxed text-white/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {!embedded && <Footer />}
    </div>
  )
}

export default ProShowsPage
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

// Import image via relative path
import ProShow from '/proshow/proshow.png'

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
      // 1. Initial State: Hide Page Header, Artist Name, and FAQs on load
      gsap.set([headerRef.current, artistRef.current, faqSectionRef.current], { opacity: 0, y: 30 })

      // 2. Position card lying flat on XZ plane (rotationX = 90), rotated on Y axis, off to right
      gsap.set(cardWrapperRef.current, {
        rotationX: 90,
        rotationY: 28,
        rotationZ: 0,
        x: 120,
        y: 240,
        z: -180,
        scale: 0.65,
        opacity: 0,
      })

      gsap.set(cardInnerRef.current, { rotationY: 0 })
      gsap.set(shadowRef.current, { opacity: 0, scale: 0.7, x: 100 })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.4 })

      // Setup golden particles
      particlesRef.current.forEach((particle) => {
        if (!particle) return
        gsap.set(particle, {
          x: (Math.random() - 0.5) * 450,
          y: gsap.utils.random(-180, 180),
          scale: gsap.utils.random(0.3, 1.2),
          opacity: 0,
        })
      })

      const mainTl = gsap.timeline({ delay: 0.3 })

      // Step A: Plain golden card appears on ground plane with shadow
      mainTl
        .to([cardWrapperRef.current, shadowRef.current], {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
        })
        // Step B: Golden spangles appear and float
        .add(() => {
          particlesRef.current.forEach((particle, i) => {
            if (!particle) return
            gsap.to(particle, {
              y: `-=${gsap.utils.random(150, 300)}`,
              x: `+=${(Math.random() - 0.5) * 90}`,
              opacity: gsap.utils.random(0.4, 0.95),
              scale: '+=0.2',
              duration: gsap.utils.random(3, 6),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.08,
            })
          })
        })
        // Step C: Gentle levitation hover on ground plane
        .to(cardWrapperRef.current, {
          y: 215,
          duration: 1.8,
          repeat: 1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        // Step D: Slow rise to screen center
        .to(
          cardWrapperRef.current,
          {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            duration: 3.8,
            ease: 'power2.out',
          },
          '+=0.1'
        )
        // Step E: Fade floor shadow
        .to(
          shadowRef.current,
          {
            opacity: 0,
            duration: 2.0,
            ease: 'power2.out',
          },
          '-=3.2'
        )
        // Step F: Y-axis rotation revealing poster image on front
        .to(
          cardInnerRef.current,
          {
            rotationY: 180,
            duration: 2.5,
            ease: 'power2.inOut',
          },
          '+=0.4'
        )
        // Step G: Ambient glow bloom
        .to(
          glowRef.current,
          {
            opacity: 1,
            scale: 1.3,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1.0'
        )
        // Step H: Rotation finish triggers appearance of Title, Artist Name, and FAQs
        .to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '+=0.2'
        )
        .to(
          artistRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          faqSectionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.6'
        )
    }, stageAreaRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className={`relative min-h-svh w-full text-gold ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="proshows" />}

      {/* Page Header with Clash Display font */}
      <header ref={headerRef} className="px-[clamp(16px,4vw,40px)] pt-[clamp(40px,6vw,64px)] text-center opacity-0">
        <h1
          ref={h1Ref}
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="text-[clamp(40px,8vw,90px)] font-bold uppercase leading-[0.95] tracking-tight drop-shadow-[0_0_30px_rgba(225,157,0,0.35)]"
        >
          Pro Show
        </h1>
      </header>

      {/* 3D Stage Area */}
      <main ref={stageAreaRef} className="relative mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] pt-12 pb-6 flex flex-col items-center justify-center min-h-[640px] overflow-hidden">
        
        {/* Ambient Glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(225,157,0,0.35)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-0"
        />

        {/* Ground Shadow */}
        <div
          ref={shadowRef}
          className="pointer-events-none absolute bottom-16 h-[70px] w-[340px] rounded-[100%] bg-black/95 blur-xl opacity-0"
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

        {/* 3D Stage Perspective Wrapper */}
        <div className="perspective-[1400px] z-10 w-full max-w-[360px] sm:max-w-[400px]">
          <div
            ref={cardWrapperRef}
            className="transform-style-3d relative w-full rounded-2xl opacity-0"
          >
            {/* Flip Container */}
            <div
              ref={cardInnerRef}
              className="transform-style-3d relative h-[560px] w-full rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* BACK OF CARD: Metallic Gold (Visible initially) */}
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#2a2208] to-[#080808] border border-gold/40 shadow-2xl"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg) translateZ(1px)',
                  willChange: 'transform'
                }}
              />

              {/* FRONT OF CARD: Revealed Image */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden bg-[#080808] border border-gold/30"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(1px)',
                  willChange: 'transform'
                }}
              >
                <img
                  src={ProShow}
                  alt="ProShow Poster"
                  className="h-full w-full object-cover rounded-2xl block relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Artist Name (Reveals below card in Clash Display) */}
        <div 
          ref={artistRef}
          className="z-10 mt-8 text-center opacity-0"
        >
          <h2
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="text-[clamp(28px,5vw,56px)] font-bold uppercase tracking-wider text-gold-gradient drop-shadow-[0_0_20px_rgba(225,157,0,0.3)]"
          >
            {artistName}
          </h2>
        </div>
      </main>

      {/* FAQ Section */}
      <section ref={faqSectionRef} className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)] py-16 opacity-0">
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
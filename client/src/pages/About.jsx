import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const panoramaImg = '/about/cet-panorama.png'

const audienceStats = [
  { value: '150+', label: 'Colleges' },
  { value: '15K+', label: 'Participants' },
  { value: '30K+', label: 'Footfall' },
  { value: '100K+', label: 'Social Reach' },
  { value: '1M+', label: 'Impressions' },
]

const initiatives = [
  {
    title: 'Drishti for Society',
    desc: 'Harnessing engineering & tech innovation for civic impact and public welfare.',
  },
  {
    title: 'Drishti for Charity',
    desc: 'Empowering underprivileged communities through student-led giving initiatives.',
  },
  {
    title: 'Drishti for Juniors',
    desc: 'Inspiring school students & young tinkerers to explore science and code.',
  },
]

function About({ embedded = false }) {
  const containerRef = useRef(null)
  const h1Ref = useRef(null)
  const h1Line1Ref = useRef(null)
  const h1Line2Ref = useRef(null)
  const whyHeadingRef = useRef(null)
  const initiativesHeadingRef = useRef(null)
  const ctaHeadingRef = useRef(null)
  const subheadRef = useRef(null)
  const stageRef = useRef(null)
  const panoramaRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (h1Line1Ref.current) applyLetterGradient(h1Line1Ref.current)
    if (h1Line2Ref.current) applyLetterGradient(h1Line2Ref.current)
    if (whyHeadingRef.current) applyLetterGradient(whyHeadingRef.current)
    if (initiativesHeadingRef.current) applyLetterGradient(initiativesHeadingRef.current)
    if (ctaHeadingRef.current) applyLetterGradient(ctaHeadingRef.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        h1Ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      gsap.fromTo(
        subheadRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      )

      const mm = gsap.matchMedia()

      // Desktop Parallax
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          panoramaRef.current,
          { y: 50, scale: 0.98 },
          {
            y: -50,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
        gsap.fromTo(
          glowRef.current,
          { opacity: 0.2, scale: 0.8 },
          {
            opacity: 0.7,
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 1,
            },
          }
        )
      })

      // Mobile Parallax
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          panoramaRef.current,
          { y: 20 },
          {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-svh w-full overflow-x-hidden ${embedded ? 'bg-transparent' : 'bg-black'}`}
    >
      <style>{`
        @keyframes float-campus {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .anim-float-campus {
          animation: float-campus 6.5s ease-in-out infinite;
        }
      `}</style>

      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="about" />}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <header className="relative z-10 mx-auto max-w-[1080px] px-4 sm:px-6 pt-[clamp(48px,8vw,80px)] sm:pt-[clamp(40px,7vw,80px)] text-center">
        <p className="text-[11px] sm:text-xs uppercase tracking-[6px] text-gold-gradient font-bold mb-4">
          // ABOUT DRISHTI &apos;26
        </p>
        <h1
          ref={h1Ref}
          className="flex flex-col items-center justify-center font-normal uppercase leading-[1.05] tracking-wide"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
        >
          <span
            ref={h1Line1Ref}
            className="text-[clamp(32px,6.2vw,84px)] block text-gold-gradient"
          >
            WHERE TECHNOLOGY
          </span>
          <span
            ref={h1Line2Ref}
            className="text-[clamp(32px,6.2vw,84px)] block text-gold-gradient mt-1 sm:mt-2"
          >
            MEETS TALENT
          </span>
        </h1>
        <p
          ref={subheadRef}
          className="mt-6 text-[clamp(15px,1.8vw,19px)] leading-relaxed text-white font-light max-w-[720px] mx-auto"
        >
          Drishti is the flagship student-run technical festival of the College of Engineering Trivandrum (CET)
          — uniting innovators, creators, and developers from 150+ colleges under one campus-wide experience.
        </p>
      </header>

      {/* ========================================================================= */}
      {/* 2. ABOUT CET & ARCHITECTURAL PANORAMA WITH PARALLAX                       */}
      {/* ========================================================================= */}
      <section
        ref={stageRef}
        className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 py-8 sm:py-14 overflow-visible"
        aria-label="About CET Showcase"
      >
        {/* Ambient Backlight Glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] sm:h-[450px] w-[90%] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,rgba(212,175,55,0.05)_50%,transparent_75%)] blur-3xl z-0"
          aria-hidden="true"
        />

        {/* Campus Panorama (Frameless Floating Illustration) */}
        <div className="relative mx-auto flex items-center justify-center w-full max-w-[1100px] z-10 px-2">
          <div
            ref={panoramaRef}
            className="anim-float-campus relative w-full flex flex-col items-center justify-center"
          >
            <img
              src={panoramaImg}
              alt="College of Engineering Trivandrum Campus"
              loading="lazy"
              decoding="async"
              className="w-full max-w-[1040px] h-auto object-contain block drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* Minimal CET Quick Facts */}
        <div className="relative z-20 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
          <div className="flex items-center gap-2">
            <span className="text-gold-gradient font-mono font-extrabold text-xl sm:text-2xl">1939</span>
            <span className="text-xs uppercase tracking-[2px] text-white/90">Founded</span>
          </div>
          <span className="text-gold/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-gradient font-mono font-extrabold text-xl sm:text-2xl">4,000+</span>
            <span className="text-xs uppercase tracking-[2px] text-white/90">Students</span>
          </div>
          <span className="text-gold/40 hidden sm:inline">·</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-gradient font-mono font-extrabold text-xl sm:text-2xl">80 Acres</span>
            <span className="text-xs uppercase tracking-[2px] text-white/90">Campus</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DRISHTI AT A GLANCE (METRICS)                                         */}
      {/* ========================================================================= */}
      <section className="relative z-10 border-y border-gold/15 bg-black py-8 sm:py-10 my-4 sm:my-8">
        <div className="mx-auto flex flex-wrap items-center justify-around gap-6 px-4 text-center max-w-[1100px]">
          {audienceStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-gradient font-mono tracking-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-[11px] sm:text-xs uppercase tracking-[2px] text-white font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MINIMAL CTA                                                            */}
      {/* ========================================================================= */}
      <section className="relative z-10 mx-auto max-w-[800px] px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="rounded-2xl border border-gold/25 bg-black p-8 sm:p-10">
          <h3
            className="text-2xl sm:text-4xl font-normal uppercase tracking-wide text-gold-gradient mb-3"
          >
            <span ref={ctaHeadingRef} style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}>
              Be Part of Drishti{' '}
            </span>
            {/* <span style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif", fontWeight: 700 }} className="text-gold-gradient">
              2026
            </span> */}
          </h3>
          <p className="text-xs sm:text-sm text-white font-light max-w-[500px] mx-auto mb-6">
            Join thousands of innovators, creators, and thinkers shaping the future of technology at CET.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/workshops"
              className="px-7 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-gold/20"
            >
              Explore Events
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full border border-gold/60 text-gold-gradient font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {!embedded && <Footer />}
    </div>
  )
}

export default About

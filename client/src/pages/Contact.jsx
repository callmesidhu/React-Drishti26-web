import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const MAP_URL =
  'https://www.google.com/maps/place/College+of+Engineering+Trivandrum+(CET)/@8.5458513,76.9037658,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bec79541c519:0x98324eb5aafb3778!8m2!3d8.5458513!4d76.9063407!16zL20vMDVtcTdz?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D'

function Contact() {
  const h1Ref = useRef(null)
  const subheadRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    applyLetterGradient(h1Ref.current)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        h1Ref.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
      )
      gsap.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      )

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: leftColRef.current, start: 'top 85%' },
          }
        )
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: rightColRef.current, start: 'top 85%' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#050505] text-gold">
      <Backdrop />
      <Navbar activeSection="contact" />

      {/* Header */}
      <header className="px-[clamp(16px,4vw,40px)] pt-[clamp(75px,9vw,110px)] text-center">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[6px] text-gold/60">Get In Touch</p>
        <h1
          ref={h1Ref}
          className="mt-1 text-[clamp(40px,8vw,100px)] font-bold uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
        >
          CONTACT
        </h1>
        <p
          ref={subheadRef}
          className="mt-2 text-[clamp(12px,2vw,18px)] uppercase tracking-[3px] md:tracking-[4px] text-white/70"
          style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
        >
          Drishti 2026 · College of Engineering Trivandrum
        </p>
      </header>

      {/* Minimal Contact & Satellite Map Grid */}
      <main className="mx-auto mt-8 md:mt-12 max-w-[1240px] px-[clamp(16px,4vw,40px)] pb-16 md:pb-24">
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Contact Info */}
          <div ref={leftColRef} className="flex flex-col justify-between gap-5 lg:col-span-5">
            {/* Convenor Card */}
            <div className="relative rounded-2xl border border-gold/25 bg-black/60 p-5 md:p-7 backdrop-blur-xl transition-all duration-300 hover:border-gold/50 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />

              <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-gold/70">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                Convenor, Drishti&apos;26
              </div>

              <h2
                className="mt-2.5 text-xl md:text-2xl font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                Gautam KJ
              </h2>

              <a
                href="tel:+918590540376"
                className="mt-1.5 inline-block font-mono text-base md:text-lg font-semibold text-gold transition-colors duration-200 hover:text-white"
              >
                +91 85905 40376
              </a>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="tel:+918590540376"
                  className="inline-flex items-center gap-2 rounded-none border border-[#FFDB86]/70 bg-gradient-to-r from-[#B78000] via-[#FFDB86] to-[#E19D00] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(225,157,0,0.35)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(255,219,134,0.6)] cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="https://wa.me/918590540376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-none border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:border-gold hover:bg-gold/20 hover:text-white hover:shadow-[0_0_20px_rgba(225,157,0,0.3)] cursor-pointer"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="relative rounded-2xl border border-gold/25 bg-black/60 p-5 md:p-7 backdrop-blur-xl transition-all duration-300 hover:border-gold/50 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />

              <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-gold/70">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                Official Email
              </div>

              <h2
                className="mt-2.5 text-base md:text-lg font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                Festival Correspondence
              </h2>

              <a
                href="mailto:drishti@cet.ac.in"
                className="mt-1.5 inline-block text-base md:text-lg font-semibold text-gold transition-colors duration-200 hover:text-white"
              >
                drishti@cet.ac.in
              </a>

              <p className="mt-2 text-xs leading-relaxed text-white/60">
                For partnerships, press, technical registrations, and queries.
              </p>
            </div>

            {/* Venue Address Card */}
            <div className="relative rounded-2xl border border-gold/25 bg-black/60 p-5 md:p-7 backdrop-blur-xl transition-all duration-300 hover:border-gold/50 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />

              <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-gold/70">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                Venue Location
              </div>

              <h2
                className="mt-2.5 text-base md:text-lg font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                College of Engineering Trivandrum (CET)
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-white/70">
                Engineering College P.O, Sreekaryam, Thiruvananthapuram, Kerala 695016
              </p>
            </div>
          </div>

          {/* Right Column: High-Tech Satellite Google Map */}
          <div
            ref={rightColRef}
            className="relative flex flex-col rounded-2xl border border-gold/30 bg-black/80 p-3 md:p-4 backdrop-blur-2xl lg:col-span-7 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          >
            {/* Luminous Reticles */}
            <span className="absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 border-gold shadow-[0_0_12px_#e19d00]" />
            <span className="absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 border-gold shadow-[0_0_12px_#e19d00]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 border-gold shadow-[0_0_12px_#e19d00]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 border-gold shadow-[0_0_12px_#e19d00]" />

            {/* Satellite Header Bar */}
            <div className="mb-2.5 flex items-center justify-between border-b border-white/10 px-2 pb-2.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
                </span>
                <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[2px] text-white">
                  Satellite View · CET Campus
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-[11px] text-white/50">
                8.5458° N, 76.9063° E
              </span>
            </div>

            {/* Embedded Satellite Map */}
            <div className="relative min-h-[280px] md:min-h-[420px] flex-1 overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a]">
              <iframe
                title="CET Satellite Map"
                src="https://maps.google.com/maps?q=8.5458513,76.9063407&t=k&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Action Bar */}
            <div className="mt-3.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
              <p className="text-xs text-white/60">
                Direct route & navigation to College of Engineering Trivandrum
              </p>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-none border border-[#FFDB86]/70 bg-gradient-to-r from-[#B78000] via-[#FFDB86] to-[#E19D00] px-6 py-2.5 md:px-7 md:py-3 text-xs font-bold uppercase tracking-[2px] md:tracking-[2.5px] text-black shadow-[0_0_20px_rgba(225,157,0,0.4)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(255,219,134,0.7)] cursor-pointer"
              >
                Open in Google Maps
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact

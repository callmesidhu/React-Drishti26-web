import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import EventDetailsModal from '../components/EventDetailsModal.jsx'
import { competitionsData } from '../data/eventsData.js'
import { applyLetterGradient } from '../utils/letterGradient.js'

function Competitions({ embedded = false }) {
  const { slug } = useParams()
  const routerNavigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const competitions = competitionsData
  const active = competitions[activeIndex] || competitions[0]

  // Find modal event if slug is present in URL
  const selectedModalEvent = slug ? competitions.find((c) => c.slug === slug) : null

  // If URL has slug on initial load, sync activeIndex
  useEffect(() => {
    if (slug) {
      const idx = competitions.findIndex((c) => c.slug === slug)
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [slug])
  const carouselRef = useRef(null)
  const pageRef = useRef(null)
  const detailRef = useRef(null)
  const activeRef = useRef(activeIndex)
  const navRef = useRef(false)
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)
  const sidebarItemsRef = useRef([])
  const registerBtnRef = useRef(null)
  const arrowRef = useRef(null)
  const sparkleRef = useRef(null)

  useEffect(() => {
    if (!h1Ref.current) return
    const textSpan = h1Ref.current.querySelector('.competitions-text')
    if (textSpan) applyLetterGradient(textSpan)
  }, [])

  useEffect(() => {
    if (!h2Ref.current) return
    h2Ref.current.textContent = competitions[activeIndex].title
    applyLetterGradient(h2Ref.current)
  }, [activeIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(h1Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      gsap.fromTo(sidebarItemsRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out', delay: 0.3 })
      gsap.fromTo(detailRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 })

      if (sparkleRef.current) {
        gsap.to(sparkleRef.current, { rotation: 360, duration: 20, ease: 'none', repeat: -1 })
        gsap.to(sparkleRef.current, { scale: 1.1, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    })

    return () => ctx.revert()
  }, [])

  const navigate = useCallback((dir) => {
    if (navRef.current) return
    navRef.current = true
    setTimeout(() => { navRef.current = false }, 600)

    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return 0
      if (next >= competitions.length) return competitions.length - 1
      return next
    })
  }, [])

  useEffect(() => {
    activeRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const handleWheel = (e) => {
      if (slug || e.target.closest('[data-lenis-prevent]') || !isInView()) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0 && activeRef.current < competitions.length - 1) {
        e.preventDefault()
        navigate(1)
      } else if (delta < 0 && activeRef.current > 0) {
        e.preventDefault()
        navigate(-1)
      }
    }

    const handleTouchStart = (e) => {
      if (slug || e.target.closest('[data-lenis-prevent]') || !isInView()) return
      el._touchY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (slug || e.target.closest('[data-lenis-prevent]') || !isInView()) return
      const dy = e.changedTouches[0].clientY - el._touchY
      if (Math.abs(dy) > 30) {
        navigate(dy < 0 ? 1 : -1)
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [navigate])

  useEffect(() => {
    if (!detailRef.current) return
    gsap.fromTo(detailRef.current.children, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08,
    })
  }, [activeIndex])

  useEffect(() => {
    if (registerBtnRef.current) {
      const btn = registerBtnRef.current
      const handleEnter = () => gsap.to(arrowRef.current, { x: 5, duration: 0.3, ease: 'power2.out' })
      const handleLeave = () => gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
      btn.addEventListener('mouseenter', handleEnter)
      btn.addEventListener('mouseleave', handleLeave)
      return () => {
        btn.removeEventListener('mouseenter', handleEnter)
        btn.removeEventListener('mouseleave', handleLeave)
      }
    }
  }, [])

  return (
    <div ref={pageRef} className={`relative h-svh max-h-svh w-full overflow-hidden flex flex-col justify-center select-none touch-none ${embedded ? 'bg-transparent' : ''}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="competitions" />}

      <div className="mx-auto flex h-full max-w-[1400px] w-full flex-col justify-between items-center px-4 pt-16 pb-4 md:flex-row md:justify-center md:gap-12 md:px-[clamp(16px,4vw,40px)] md:py-0">
        {/* Desktop Sidebar - Exact Original Design */}
        <aside
          ref={carouselRef}
          className="hidden md:flex w-full flex-col justify-center gap-3 md:w-[35%] md:gap-4"
        >
          {competitions.map((comp, i) => (
            <div
              key={comp.id}
              ref={(el) => { sidebarItemsRef.current[i] = el }}
              className="w-full"
              style={{ opacity: 0 }}
            >
              <div
                className={`group flex h-[70px] w-full items-stretch text-left transition-all duration-300 md:h-[180px] cursor-pointer ${
                  i === activeIndex ? 'border-gold' : 'border-transparent opacity-40 hover:opacity-75'
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <div
                  className={`w-1 flex-shrink-0 transition-all duration-300 ${
                    i === activeIndex ? 'bg-gold' : 'bg-white/10'
                  }`}
                />
                <div
                  className={`flex-1 overflow-hidden border border-l-0 transition-all duration-300 ${
                    i === activeIndex
                      ? 'border-gold/40 bg-[#11111180]'
                      : 'border-white/5 bg-[#0a0a0a60]'
                  }`}
                >
                  <div className={`flex h-full w-full items-center justify-center transition-colors duration-300 px-4 ${
                    i === activeIndex ? 'bg-[#1a1a1a60]' : 'bg-[#11111140]'
                  }`}>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 md:text-sm ${
                        i === activeIndex ? 'text-gold' : 'text-white/30'
                      }`}
                      style={{
                        writingMode: 'horizontal-tb',
                        fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif",
                      }}
                    >
                      {comp.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        {/* Content Section: Original on Laptop, Full-Height Card on Mobile */}
        <section className="flex flex-1 flex-col justify-between md:justify-center items-center md:items-start text-center md:text-left w-full h-full md:h-auto md:pl-4 py-2 md:py-0">
          {/* Header */}
          <div className="relative pt-1 md:pt-0 mb-0 md:mb-2 w-full flex flex-col items-center md:items-start">
            <p className="text-[10px] md:hidden uppercase tracking-[5px] text-gold/70 mb-1">
              Event 0{activeIndex + 1} of 0{competitions.length}
            </p>
            <h1
              ref={h1Ref}
              className="text-[clamp(32px,8vw,110px)] font-bold uppercase leading-none tracking-tight md:text-[clamp(56px,9vw,110px)]"
              style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 competitions-text">COMPETITIONS</span>
              </span>
            </h1>
          </div>

          {/* Details: Exact Original on Laptop, Responsive Full-Height Card on Mobile */}
          <div
            ref={detailRef}
            className="relative flex-1 md:flex-initial w-full max-w-[440px] md:max-w-none md:border-l-2 md:border-gold/30 md:pl-6 flex flex-col justify-between md:justify-start items-center md:items-start my-2 md:my-0 md:mt-4 p-6 sm:p-8 md:p-0 rounded-3xl md:rounded-none border md:border-0 border-gold/30 md:border-transparent bg-transparent min-h-[330px] md:min-h-0"
          >
            {/* Mobile Luminous Corner Reticles */}
            <span className="md:hidden absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-gold shadow-[0_0_10px_#e19d00]" />
            <span className="md:hidden absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-gold shadow-[0_0_10px_#e19d00]" />
            <span className="md:hidden absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-gold shadow-[0_0_10px_#e19d00]" />
            <span className="md:hidden absolute -bottom-1.5 -right-1.5 h-4 w-4 border-b-2 border-r-2 border-gold shadow-[0_0_10px_#e19d00]" />

            {/* Mobile Event Tag & Title */}
            <div className="flex flex-col items-center md:items-start w-full">
              <span className="md:hidden inline-block px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-[9px] font-mono uppercase tracking-[2.5px] text-gold mb-3">
                CET Technical Fest
              </span>

              <h2
                ref={h2Ref}
                className="text-[clamp(24px,6.5vw,46px)] md:text-[clamp(24px,5vw,44px)] font-bold uppercase tracking-wide text-center md:text-left"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                {active.title}
              </h2>
            </div>

            {/* Description */}
            <p className="my-auto py-3 md:my-0 md:py-0 md:mt-4 md:mt-5 max-w-[550px] text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/80 md:text-white/60 text-center md:text-left">
              {active.description}
            </p>

            {/* CTA Button */}
            <div className="w-full md:w-auto flex justify-center md:justify-start md:mt-8">
              <button
                ref={registerBtnRef}
                type="button"
                onClick={() => routerNavigate(`/competitions/${active.slug}`)}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-3 border border-[#FFDB86]/70 bg-gradient-to-r from-[#B78000] via-[#FFDB86] to-[#E19D00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(225,157,0,0.4)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(255,219,134,0.7)] md:px-8 md:py-3.5 md:text-sm cursor-pointer"
                style={{ borderRadius: '50px' }}
              >
                View Details
                <svg
                  ref={arrowRef}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Bottom Navigation Controls */}
          <div className="flex md:hidden items-center justify-between w-full max-w-[360px] pt-1 pb-1 px-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={activeIndex === 0}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-base transition-all duration-200 cursor-pointer ${
                activeIndex === 0
                  ? 'border-white/10 text-white/20'
                  : 'border-gold/60 text-gold hover:border-gold hover:bg-gold/15 shadow-[0_0_12px_rgba(225,157,0,0.2)]'
              }`}
              aria-label="Previous competition"
            >
              ←
            </button>

            <div className="flex items-center gap-2.5">
              {competitions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-8 bg-gold shadow-[0_0_12px_#e19d00]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to competition ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={activeIndex === competitions.length - 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-base transition-all duration-200 cursor-pointer ${
                activeIndex === competitions.length - 1
                  ? 'border-white/10 text-white/20'
                  : 'border-gold/60 text-gold hover:border-gold hover:bg-gold/15 shadow-[0_0_12px_rgba(225,157,0,0.2)]'
              }`}
              aria-label="Next competition"
            >
              →
            </button>
          </div>
        </section>
      </div>

      {/* View Details Popup Modal */}
      {selectedModalEvent && (
        <EventDetailsModal
          event={selectedModalEvent}
          onClose={() => routerNavigate('/competitions')}
        />
      )}
    </div>
  )
}

export default Competitions

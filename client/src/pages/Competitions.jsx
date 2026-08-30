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
      if (!isInView()) return
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
      if (!isInView()) return
      el._touchY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (!isInView()) return
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

      <div className="mx-auto flex h-full max-w-[1400px] w-full flex-col justify-center items-center gap-4 px-[clamp(16px,4vw,40px)] pt-14 pb-4 md:flex-row md:gap-12 md:pt-16 md:pb-0">
        {/* Mobile Horizontal Tabs & Desktop Vertical Aside */}
        <aside
          ref={carouselRef}
          className="flex w-full flex-row md:flex-col justify-center md:justify-center gap-2 md:gap-4 md:w-[35%] overflow-x-auto md:overflow-visible pb-1 md:pb-0"
        >
          {competitions.map((comp, i) => (
            <div
              key={comp.id}
              ref={(el) => { sidebarItemsRef.current[i] = el }}
              className="flex-1 md:flex-initial md:w-full min-w-0"
              style={{ opacity: 0 }}
            >
              <button
                type="button"
                className={`group flex h-[44px] md:h-[120px] lg:h-[135px] w-full items-stretch text-left transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'border-gold' : 'border-transparent opacity-40 hover:opacity-75'
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <div
                  className={`w-1 flex-shrink-0 transition-all duration-300 ${
                    i === activeIndex ? 'bg-gold shadow-[0_0_10px_#e19d00]' : 'bg-white/10'
                  }`}
                />
                <div
                  className={`flex-1 overflow-hidden border border-l-0 transition-all duration-300 ${
                    i === activeIndex
                      ? 'border-gold/40 bg-[#11111190]'
                      : 'border-white/5 bg-[#0a0a0a60]'
                  }`}
                >
                  <div className={`flex h-full w-full items-center justify-center transition-colors duration-300 px-2 md:px-4 ${
                    i === activeIndex ? 'bg-[#1a1a1a70]' : 'bg-[#11111140]'
                  }`}>
                    <span
                      className={`text-[11px] md:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 truncate text-center ${
                        i === activeIndex ? 'text-gold' : 'text-white/40'
                      }`}
                      style={{
                        fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif",
                      }}
                    >
                      {comp.title}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </aside>

        <section className="flex flex-1 flex-col justify-center items-center md:items-start text-center md:text-left md:pl-4">
          <div className="relative mb-1 md:mb-2">
            <h1
              ref={h1Ref}
              className="text-[clamp(32px,7vw,110px)] font-bold uppercase leading-none tracking-tight md:text-[clamp(56px,9vw,110px)]"
              style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 competitions-text">COMPETITIONS</span>
                <img
                  ref={sparkleRef}
                  src="/workshops/shine.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[8%] -top-[18%] z-0 w-[clamp(44px,8vw,120px)] max-w-none mix-blend-screen"
                />
              </span>
            </h1>
          </div>

          <div ref={detailRef} className="mt-2 md:mt-6 md:border-l-2 md:border-gold/30 md:pl-6 flex flex-col items-center md:items-start">
            <h2
              ref={h2Ref}
              className="text-[clamp(20px,4.5vw,44px)] font-bold uppercase tracking-wide"
              style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
            >
              {active.title}
            </h2>

            <p className="mt-2 md:mt-5 max-w-[550px] text-xs leading-relaxed text-white/70 md:text-[15px]">
              {active.description}
            </p>

            <button
              ref={registerBtnRef}
              type="button"
              onClick={() => routerNavigate(`/competitions/${active.slug}`)}
              className="mt-4 md:mt-8 inline-flex items-center gap-2.5 rounded-none border border-[#FFDB86]/70 bg-gradient-to-r from-[#B78000] via-[#FFDB86] to-[#E19D00] px-6 py-2.5 md:px-8 md:py-3.5 text-xs font-bold uppercase tracking-[2px] text-black shadow-[0_0_20px_rgba(225,157,0,0.4)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(255,219,134,0.7)] cursor-pointer"
            >
              View Details
              <svg
                ref={arrowRef}
                width="16"
                height="16"
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

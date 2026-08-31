import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { applyLetterGradient } from '../utils/letterGradient.js'

function EventDetailsModal({ event, onClose }) {
  const overlayRef = useRef(null)
  const containerRef = useRef(null)
  const categoryHeaderRef = useRef(null)
  const titleRef = useRef(null)
  const posterRef = useRef(null)
  const detailsListRef = useRef(null)
  const registerBtnRef = useRef(null)

  const isBlue = event?.theme === 'blue' || event?.category === 'DAKSHA'

  useEffect(() => {
    // Lock Lenis scroll while modal is active
    if (window.lenis) window.lenis.stop()
    document.body.style.overflow = 'hidden'

    const gradientClass = isBlue ? 'text-blue-gradient' : 'text-gold-gradient'
    if (categoryHeaderRef.current) applyLetterGradient(categoryHeaderRef.current, gradientClass)
    if (titleRef.current) applyLetterGradient(titleRef.current, gradientClass)

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.2)', delay: 0.1 }
      )
    })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      ctx.revert()
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [isBlue])

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    })
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }

  if (!event) return null

  const categoryName = event.category || 'EVENT DETAILS'
  const guidelinesLabel = event.guidelinesTitle || `${event.title.toUpperCase()} GUIDELINES`

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-black/90 p-4 sm:p-6 md:p-8 backdrop-blur-2xl touch-pan-y overscroll-contain"
      style={{
        backgroundImage: isBlue
          ? 'linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)'
          : 'linear-gradient(rgba(225, 157, 0, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 157, 0, 0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close details"
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border bg-black/80 transition-all duration-300 hover:scale-110 hover:text-black cursor-pointer ${
          isBlue
            ? 'border-sky-400/40 text-sky-400 hover:border-sky-400 hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]'
            : 'border-gold/40 text-gold hover:border-gold hover:bg-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Inner Centering Wrapper */}
      <div
        data-lenis-prevent="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose()
        }}
        className="flex min-h-full w-full items-center justify-center py-6 sm:py-10"
      >
        {/* Main Container */}
        <div
          ref={containerRef}
          data-lenis-prevent="true"
          className={`relative w-full max-w-[1100px] rounded-2xl border bg-black/75 p-6 shadow-[0_0_80px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-10 ${
            isBlue ? 'border-sky-500/20' : 'border-gold/20'
          }`}
        >
        {/* Top Centered Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h2
            ref={categoryHeaderRef}
            style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
            className={`text-[clamp(32px,5vw,54px)] font-bold uppercase leading-none tracking-tight ${
              isBlue ? 'text-blue-gradient' : 'text-gold-gradient'
            }`}
          >
            {categoryName}
          </h2>
          <p
            style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
            className={`mt-1 text-sm uppercase tracking-[6px] ${
              isBlue ? 'text-sky-400/80' : 'text-gold/80'
            }`}
          >
            EVENTS
          </p>

          <div className="mt-4 flex w-full max-w-[400px] items-center justify-center gap-3">
            <span className={`h-[1px] flex-1 bg-gradient-to-r ${isBlue ? 'from-transparent to-sky-400/50' : 'from-transparent to-gold/50'}`} />
            <span className={`h-1.5 w-1.5 rotate-45 border ${isBlue ? 'border-sky-400 bg-sky-400' : 'border-gold bg-gold'}`} />
            <span className={`h-[1px] flex-1 bg-gradient-to-l ${isBlue ? 'from-transparent to-sky-400/50' : 'from-transparent to-gold/50'}`} />
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
          {/* Left Column: Guidelines & Description */}
          <div className="flex flex-col justify-center md:col-span-7">
            <p className={`text-[11px] font-semibold uppercase tracking-[4px] ${isBlue ? 'text-sky-400/70' : 'text-gold/70'}`}>
              {guidelinesLabel}
            </p>

            <h3
              ref={titleRef}
              style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              className={`mt-2 text-[clamp(28px,4.5vw,52px)] font-bold uppercase leading-[1.05] tracking-tight ${
                isBlue ? 'text-blue-gradient' : 'text-gold-gradient'
              }`}
            >
              {event.title}
            </h3>

            {event.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                {event.description}
              </p>
            )}

            {event.details && event.details.length > 0 && (
              <div ref={detailsListRef} className="mt-6 flex flex-col gap-3">
                {event.details.map((line, idx) => {
                  const hasPrefix = line.includes(' — ')
                  const [label, ...rest] = hasPrefix ? line.split(' — ') : [null, line]
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 block h-1.5 w-1.5 shrink-0 rotate-45 ${
                          isBlue ? 'bg-sky-400 shadow-[0_0_6px_#38bdf8]' : 'bg-gold shadow-[0_0_6px_#D4AF37]'
                        }`}
                      />
                      <span className="text-xs leading-relaxed md:text-sm text-white/85">
                        {hasPrefix ? (
                          <>
                            <span className={`font-semibold ${isBlue ? 'text-sky-400' : 'text-gold'}`}>
                              {label} —{' '}
                            </span>
                            <span>{rest.join(' — ')}</span>
                          </>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-8 flex items-center justify-start">
              <a
                ref={registerBtnRef}
                href={event.registerUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-none border bg-transparent px-10 py-3.5 text-xs font-bold uppercase tracking-[4px] transition-all duration-300 hover:text-black ${
                  isBlue
                    ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]'
                    : 'border-gold text-gold hover:bg-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]'
                }`}
              >
                REGISTER
              </a>
            </div>
          </div>

          {/* Right Column: Poster Image with Glowing Corner Brackets */}
          <div className="flex items-center justify-center md:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[340px] p-2">
              {/* Luminous Corner Brackets */}
              <span className={`pointer-events-none absolute -top-1.5 -left-1.5 h-6 w-6 border-t-2 border-l-2 ${
                isBlue ? 'border-sky-400 shadow-[0_0_12px_#38bdf8]' : 'border-gold shadow-[0_0_12px_#D4AF37]'
              }`} />
              <span className={`pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 border-t-2 border-r-2 ${
                isBlue ? 'border-sky-400 shadow-[0_0_12px_#38bdf8]' : 'border-gold shadow-[0_0_12px_#D4AF37]'
              }`} />
              <span className={`pointer-events-none absolute -bottom-1.5 -left-1.5 h-6 w-6 border-b-2 border-l-2 ${
                isBlue ? 'border-sky-400 shadow-[0_0_12px_#38bdf8]' : 'border-gold shadow-[0_0_12px_#D4AF37]'
              }`} />
              <span className={`pointer-events-none absolute -bottom-1.5 -right-1.5 h-6 w-6 border-b-2 border-r-2 ${
                isBlue ? 'border-sky-400 shadow-[0_0_12px_#38bdf8]' : 'border-gold shadow-[0_0_12px_#D4AF37]'
              }`} />

              {/* Poster Box */}
              <div className={`relative h-full w-full overflow-hidden border bg-black/60 ${
                isBlue ? 'border-sky-500/40 shadow-[0_0_50px_rgba(56,189,248,0.25)]' : 'border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.25)]'
              }`}>
                <img
                  ref={posterRef}
                  src={event.image}
                  alt={event.alt || event.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default EventDetailsModal

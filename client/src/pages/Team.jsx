import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'

const teamMembers = [
  { id: 1, name: 'Anjali', role: 'Design Head', image: '/team/anjali.jpg' },
  { id: 2, name: 'Rahul', role: 'President', image: '/team/rahul.jpg' },
  { id: 3, name: 'Ananya', role: 'Vice President', image: '/team/anjali.jpg' },
  { id: 4, name: 'Priya', role: 'Secretary', image: '/team/anjali.jpg' },
  { id: 5, name: 'Arjun', role: 'Treasurer', image: '/team/rahul.jpg' },
  { id: 6, name: 'Sneha', role: 'Technical Head', image: '/team/anjali.jpg' },
  { id: 7, name: 'Vikram', role: 'Marketing Head', image: '/team/rahul.jpg' },
]

const webTeamMembers = [
  { id: 1, name: 'Sidharth', role: 'Lead Developer', image: '/team/rahul.jpg' },
  { id: 2, name: 'Adithya', role: 'Frontend Lead', image: '/team/anjali.jpg' },
  { id: 3, name: 'Aravind', role: 'Backend Lead', image: '/team/rahul.jpg' },
  { id: 4, name: 'Nandana', role: 'UI/UX Designer', image: '/team/anjali.jpg' },
  { id: 5, name: 'Gautam', role: 'Fullstack Dev', image: '/team/rahul.jpg' },
  { id: 6, name: 'Rohan', role: 'Creative Motion', image: '/team/rahul.jpg' },
  { id: 7, name: 'Devika', role: 'QA & Systems', image: '/team/anjali.jpg' },
]

const TOTAL = teamMembers.length

function shortestDiff(from, to) {
  let d = to - from
  if (d > TOTAL / 2) d -= TOTAL
  if (d < -TOTAL / 2) d += TOTAL
  return d
}

function Team({ embedded = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeGroup, setActiveGroup] = useState('committee')
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const navRef = useRef(false)
  const touchStart = useRef({ x: 0, y: 0 })
  const activeIndexRef = useRef(0)
  const members = activeGroup === 'committee' ? teamMembers : webTeamMembers

  const navigate = useCallback((dir) => {
    if (navRef.current) return
    navRef.current = true
    setTimeout(() => { navRef.current = false }, 500)
    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return 0
      if (next >= TOTAL) return TOTAL - 1
      return next
    })
  }, [])

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const text = el.textContent
    el.textContent = ''
    const fragment = document.createDocumentFragment()
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.className = 'text-gold-gradient'
      fragment.appendChild(span)
    })
    el.appendChild(fragment)

    const chars = el.querySelectorAll('span')
    gsap.from(chars, {
      y: 60,
      opacity: 0,
      rotateX: -90,
      stagger: 0.04,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.2,
    })
  }, [])

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.card-inner')
    if (!cards || cards.length === 0) return

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.85 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.3)',
      delay: 0.6,
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const handleWheel = (e) => {
      if (!isInView()) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0 && activeIndexRef.current < TOTAL - 1) {
        e.preventDefault()
        navigate(1)
      } else if (delta < 0 && activeIndexRef.current > 0) {
        e.preventDefault()
        navigate(-1)
      }
    }

    const handleTouchStart = (e) => {
      if (!isInView()) return
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e) => {
      if (!isInView()) return
      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        if (dx < 0 && activeIndexRef.current < TOTAL - 1) {
          navigate(1)
        } else if (dx > 0 && activeIndexRef.current > 0) {
          navigate(-1)
        }
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

  const getCardTransform = useCallback((index) => {
    const diff = shortestDiff(activeIndex, index)
    const absDiff = Math.abs(diff)
    const sign = diff === 0 ? 0 : diff > 0 ? 1 : -1

    if (absDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(80px) rotateY(0deg) scale(1)',
        zIndex: 10,
        opacity: 1,
      }
    }

    if (absDiff > 2) {
      return {
        transform: `translateX(${sign * 9999}px) scale(0)`,
        zIndex: 0,
        opacity: 0,
        pointerEvents: 'none',
      }
    }

    const angle = sign * -28 // In 3D carousel, left cards face right and right cards face left
    const translateX = sign === 1 ? (absDiff === 1 ? 210 : 380) : (absDiff === 1 ? -210 : -380)
    const translateZ = absDiff === 1 ? -40 : -110
    const scale = absDiff === 1 ? 0.94 : 0.88
    const zIndex = 10 - absDiff

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${angle}deg) scale(${scale})`,
      zIndex,
      opacity: 1,
    }
  }, [activeIndex])

  return (
    <div className={`relative h-svh max-h-svh w-full overflow-hidden flex flex-col justify-between pt-16 pb-4 select-none touch-none ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="team" />}

      <header className="px-[clamp(16px,4vw,40px)] pb-1 pt-2 text-center z-10">
        <h1
          ref={titleRef}
          className="text-[clamp(32px,6vw,72px)] font-bold uppercase leading-none tracking-tight text-gold-gradient"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
        >
          MEET THE TEAM
        </h1>

        <div className="mt-4 inline-flex overflow-hidden rounded-full border border-gold/60" role="group" aria-label="Team selection">
          {[
            { id: 'committee', label: 'Committee' },
            { id: 'web', label: 'Web Team' },
          ].map((group) => {
            const isSelected = activeGroup === group.id
            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveGroup(group.id)}
                className={`px-6 py-2 text-xs font-semibold uppercase tracking-[2px] transition-colors duration-300 md:px-8 cursor-pointer ${
                  isSelected
                    ? 'bg-gold-gradient text-black font-bold'
                    : 'bg-black text-gold hover:bg-gold/10'
                }`}
              >
                {group.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* 3D Stage Container */}
      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden touch-none my-auto w-full"
        style={{ perspective: '1100px' }}
      >
        {/* Curved 3D Stage Horizon Floor */}
        <div className="pointer-events-none absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[160%] max-w-[1500px] h-[220px] rounded-[100%] bg-gradient-to-b from-[#1c1c20] via-[#101013] to-[#050505] border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.9)]" />

        {/* 3D Card Stack */}
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {members.map((member, index) => {
            const diff = shortestDiff(activeIndex, index)
            const isLeft = diff < 0
            const isCenter = diff === 0

            return (
              <div
                key={member.id}
                className="absolute cursor-pointer will-change-transform select-none"
                style={{
                  ...getCardTransform(index),
                  transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease-out, z-index 0s',
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`card-inner relative flex flex-col justify-between overflow-hidden rounded-[24px] transition-all duration-300 ${
                    isCenter
                      ? 'bg-[#E5E7EB] border-2 border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(225,157,0,0.25)]'
                      : 'bg-[#D6D9DE] border border-white/15 shadow-[0_20px_45px_rgba(0,0,0,0.65)]'
                  }`}
                  style={{
                    height: '380px',
                    width: '270px',
                  }}
                >
                  {/* Photo for Center Active Card */}
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`absolute inset-0 h-full w-full object-cover grayscale contrast-110 transition-opacity duration-300 ${
                        isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    />
                  )}

                  {/* Vertical Name: Left on Left Cards, Right on Right & Center Cards */}
                  <div
                    className={`absolute top-0 flex h-full items-center pointer-events-none z-10 ${
                      isLeft ? 'left-3 sm:left-4' : 'right-3 sm:right-4'
                    }`}
                  >
                    <span
                      className={`text-4xl md:text-5xl font-black uppercase tracking-widest select-none ${
                        isCenter
                          ? 'text-black/85 drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]'
                          : 'text-zinc-700/65'
                      }`}
                      style={{
                        writingMode: 'vertical-lr',
                        textOrientation: 'mixed',
                        fontFamily: "'Clash Display', 'Inter', sans-serif",
                      }}
                    >
                      {member.name}
                    </span>
                  </div>

                  {/* Bottom Role Banner for Active Card */}
                  {isCenter && (
                    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent pt-14 pb-5 px-3">
                      <p
                        className="text-center text-sm md:text-base font-black uppercase tracking-[3px] text-[#FFDB86] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "'Bietro DEMO-Regular', sans-serif" }}
                      >
                        {member.role}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 pb-2 z-10">
        <div className="flex items-center justify-center gap-2">
          {members.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-gold shadow-[0_0_10px_#e19d00]' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>
        <p className="text-center text-[10px] uppercase tracking-[4px] text-white/30">
          Scroll or swipe to explore
        </p>
      </div>
    </div>
  )
}

export default Team

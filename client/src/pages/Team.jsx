import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'

const teamMembers = [
  { id: 1, name: 'Ananya', role: 'President', image: 'https://i.pravatar.cc/400?img=1' },
  { id: 2, name: 'Rahul', role: 'Vice President', image: 'https://i.pravatar.cc/400?img=3' },
  { id: 3, name: 'Priya', role: 'Secretary', image: 'https://i.pravatar.cc/400?img=5' },
  { id: 4, name: 'Arjun', role: 'Treasurer', image: 'https://i.pravatar.cc/400?img=7' },
  { id: 5, name: 'Sneha', role: 'Technical Head', image: 'https://i.pravatar.cc/400?img=9' },
  { id: 6, name: 'Vikram', role: 'Design Head', image: 'https://i.pravatar.cc/400?img=11' },
  { id: 7, name: 'Meera', role: 'Marketing Head', image: 'https://i.pravatar.cc/400?img=16' },
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
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const navRef = useRef(false)
  const touchStart = useRef({ x: 0, y: 0 })

  const navigate = useCallback((dir) => {
    if (navRef.current) return
    navRef.current = true
    setTimeout(() => { navRef.current = false }, 500)
    setActiveIndex((prev) => (prev + dir + TOTAL) % TOTAL)
  }, [])

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
      span.className = 'bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent'
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
    const imgs = containerRef.current?.querySelectorAll('.card-img')
    if (!imgs) return

    gsap.set(imgs, { opacity: 1 })

    const timer = setTimeout(() => {
      imgs.forEach((img, i) => {
        if (teamMembers[i].id !== teamMembers[activeIndex].id) {
          gsap.to(img, { opacity: 0.85, duration: 0.4, ease: 'power2.out' })
        }
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [activeIndex])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const handleWheel = (e) => {
      if (!isInView()) return
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0) navigate(1)
      else if (delta < 0) navigate(-1)
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
        navigate(dx < 0 ? 1 : -1)
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
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
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

    const angle = diff * 55
    const translateZ = 350
    const opacity = absDiff === 0 ? 1 : 0.7
    const scale = absDiff === 0 ? 1 : 0.85
    const zIndex = 10 - absDiff

    return {
      transform: `rotateY(${angle}deg) translateZ(${translateZ}px) scale(${scale})`,
      zIndex,
      opacity,
    }
  }, [activeIndex])

  return (
    <div className={`relative min-h-svh w-full overflow-hidden ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar />}

      <header className="px-[clamp(16px,4vw,40px)] pb-4 pt-[clamp(32px,6vw,64px)] text-center">
        <h1
          ref={titleRef}
          className="text-[clamp(32px,8vw,120px)] font-bold uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Meet The Team
        </h1>
      </header>

      <div
        ref={containerRef}
        className="relative flex h-[70vh] items-center justify-center overflow-hidden touch-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="absolute cursor-pointer"
              style={{
                ...getCardTransform(index),
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out, z-index 0s',
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className="card-inner relative overflow-hidden rounded-md"
                style={{
                  height: '420px',
                  width: '300px',
                  background: index === activeIndex ? '#111' : '#1a1a1a',
                  border: index === activeIndex ? '1px solid rgba(225,157,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: index === activeIndex
                    ? '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(225,157,0,0.1)'
                    : '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-img h-full w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-0 right-4 flex h-full items-center">
                  <span
                    className="text-3xl font-bold uppercase tracking-wider text-white/15"
                    style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {member.name}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-[10px] uppercase tracking-[3px] text-gold/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 pb-12">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-xs uppercase tracking-[4px] text-white/30">
        Scroll or swipe to explore
      </p>
    </div>
  )
}

export default Team

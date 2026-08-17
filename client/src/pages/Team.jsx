import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'

const teamMembers = [
  { id: 1, name: 'Ananya', role: 'President', image: '/team/member1.svg' },
  { id: 2, name: 'Rahul', role: 'Vice President', image: '/team/member2.svg' },
  { id: 3, name: 'Priya', role: 'Secretary', image: '/team/member3.svg' },
  { id: 4, name: 'Arjun', role: 'Treasurer', image: '/team/member4.svg' },
  { id: 5, name: 'Sneha', role: 'Technical Head', image: '/team/member5.svg' },
  { id: 6, name: 'Vikram', role: 'Design Head', image: '/team/member6.svg' },
  { id: 7, name: 'Meera', role: 'Marketing Head', image: '/team/member7.svg' },
]

function TeamCard({ member, isActive }) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-sm transition-all duration-500 ${
        isActive
          ? 'h-[420px] w-[300px] md:h-[480px] md:w-[340px]'
          : 'h-[360px] w-[260px] md:h-[420px] md:w-[300px]'
      }`}
      style={{
        background: isActive ? '#111' : '#1a1a1a',
        border: isActive ? '1px solid rgba(225,157,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {isActive ? (
        <div className="relative h-full w-full">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-0 right-4 flex h-full items-center">
            <span
              className="font-display text-4xl font-bold uppercase tracking-wider text-white/20"
              style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
            >
              {member.name}
            </span>
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-[10px] uppercase tracking-[3px] text-gold/70">{member.role}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#222]">
          <div className="h-3/4 w-3/4 rounded-sm bg-[#2a2a2a]" />
        </div>
      )}
    </div>
  )
}

function Team() {
  const [activeIndex, setActiveIndex] = useState(0)

  const getCardStyle = (index) => {
    const diff = index - activeIndex
    const absDiff = Math.abs(diff)

    if (absDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(40px) rotateY(0deg)',
        zIndex: 10,
        opacity: 1,
      }
    }

    const direction = diff < 0 ? -1 : 1
    const translateX = direction * (240 + (absDiff - 1) * 160)
    const rotateY = direction * -35
    const translateZ = -120 * absDiff
    const opacity = absDiff <= 2 ? 1 - absDiff * 0.25 : 0

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
      zIndex: 10 - absDiff,
      opacity: Math.max(opacity, 0),
    }
  }

  const navigate = (direction) => {
    setActiveIndex((prev) => {
      const next = prev + direction
      if (next < 0) return teamMembers.length - 1
      if (next >= teamMembers.length) return 0
      return next
    })
  }

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-black">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, #000 0%, #000 50%, #4a4a4a 70%, #666 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%)',
        }}
      />
      <Navbar />

      <header className="px-[clamp(16px,4vw,40px)] pb-4 pt-[clamp(32px,6vw,64px)] text-center">
        <h1 className="text-[clamp(48px,10vw,120px)] font-bold uppercase leading-none tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>
          <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(225,157,0,0.3)]">
            Meet The Team
          </span>
        </h1>
      </header>

      <div className="relative mx-auto mt-8 flex h-[500px] w-full max-w-[1200px] items-center justify-center md:mt-12 md:h-[560px]">
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          <div
            className="relative flex items-center justify-center transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="absolute cursor-pointer transition-all duration-500"
                style={getCardStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                <TeamCard member={member} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-gold transition-all hover:bg-gold hover:text-black md:left-8"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-gold transition-all hover:bg-gold hover:text-black md:right-8"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 pb-16">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-gold'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Team

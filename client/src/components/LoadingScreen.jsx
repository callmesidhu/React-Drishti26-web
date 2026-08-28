import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const ringRef = useRef(null)
  const yearRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => onComplete?.(),
          })
        },
      })

      tl.fromTo(logoRef.current, { scale: 0, rotation: -180, opacity: 0 }, {
        scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)',
      })

      tl.fromTo(ringRef.current, { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out',
      }, '-=0.4')

      tl.fromTo(yearRef.current, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
      }, '-=0.2')

      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 3,
        ease: 'none',
        repeat: -1,
      })

      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="relative flex items-center justify-center">
        {/* Rotating ring */}
        <svg
          ref={ringRef}
          className="absolute h-[140px] w-[140px] md:h-[180px] md:w-[180px]"
          viewBox="0 0 180 180"
          style={{ opacity: 0 }}
        >
          <circle
            cx="90"
            cy="90"
            r="85"
            fill="none"
            stroke="rgba(225,157,0,0.3)"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
          <circle
            cx="90"
            cy="90"
            r="75"
            fill="none"
            stroke="rgba(225,157,0,0.15)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Logo */}
        <img
          ref={logoRef}
          src="/daksha/drishti-logo.png"
          alt="Drishti"
          className="relative z-10 h-[60px] w-auto md:h-[80px]"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Text */}
      <div className="mt-8 text-center">
        <p
          ref={yearRef}
          className="text-xs uppercase tracking-[4px] text-white/30"
          style={{ opacity: 0 }}
        >
          Drishti 2026
        </p>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 h-8 w-8 border-l-2 border-t-2 border-gold/40" />
      <div className="absolute top-6 right-6 h-8 w-8 border-r-2 border-t-2 border-gold/40" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-l-2 border-b-2 border-gold/40" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-r-2 border-b-2 border-gold/40" />
    </div>
  )
}

export default LoadingScreen

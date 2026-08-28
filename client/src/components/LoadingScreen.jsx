import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const ringRef = useRef(null)
  const ring2Ref = useRef(null)
  const ring3Ref = useRef(null)
  const yearRef = useRef(null)
  const cornersRef = useRef([])
  const particlesRef = useRef(null)
  const shimmerRef = useRef(null)
  const bgGridRef = useRef(null)
  const shapesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Dramatic 3D exit animation
          const exitTl = gsap.timeline({
            onComplete: () => onComplete?.(),
          })

          // Logo 3D flip out
          exitTl.to(logoRef.current, {
            rotationY: 180,
            rotationX: 45,
            scale: 1.5,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.in',
          })

          // Rings expand and fade
          exitTl.to([ringRef.current, ring2Ref.current, ring3Ref.current], {
            scale: 3,
            opacity: 0,
            rotation: '+=180',
            duration: 0.8,
            ease: 'power2.in',
            stagger: 0.05,
          }, '-=0.4')

          // Year text slide out
          exitTl.to(yearRef.current, {
            y: -30,
            opacity: 0,
            letterSpacing: '20px',
            duration: 0.4,
            ease: 'power2.in',
          }, '-=0.6')

          // Corners fly out to edges
          exitTl.to(cornersRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power2.in',
          }, '-=0.4')

          // Shapes scatter
          exitTl.to(shapesRef.current, {
            scale: 0,
            opacity: 0,
            rotation: '+=360',
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.in',
          }, '-=0.3')

          // Particles burst outward
          const particles = particlesRef.current?.children
          if (particles) {
            exitTl.to(Array.from(particles), {
              x: () => (Math.random() - 0.5) * window.innerWidth,
              y: () => (Math.random() - 0.5) * window.innerHeight,
              scale: 2,
              opacity: 0,
              duration: 0.6,
              stagger: 0.01,
              ease: 'power2.in',
            }, '-=0.5')
          }

          // Container fade with 3D rotate
          exitTl.to(containerRef.current, {
            rotationX: 10,
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
          }, '-=0.3')
        },
      })

      // ---- ENTRANCE ANIMATIONS ----

      // Background grid fade in
      gsap.fromTo(bgGridRef.current,
        { opacity: 0 },
        { opacity: 0.1, duration: 1, delay: 0.2 }
      )

      // Shimmer line sweep
      gsap.fromTo(shimmerRef.current,
        { x: '-100%' },
        { x: '200%', duration: 1.5, delay: 0.5, ease: 'power2.inOut' }
      )

      // Logo with 3D entrance
      tl.fromTo(logoRef.current,
        { scale: 0, rotation: -180, rotationY: 90, opacity: 0 },
        {
          scale: 1, rotation: 0, rotationY: 0, opacity: 1,
          duration: 1, ease: 'elastic.out(1, 0.4)',
        }
      )

      // Rings with stagger and rotation
      tl.fromTo(ringRef.current,
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.5)' },
        '-=0.6'
      )

      tl.fromTo(ring2Ref.current,
        { scale: 0, opacity: 0, rotation: 90 },
        { scale: 1, opacity: 0.6, rotation: 0, duration: 0.7, ease: 'back.out(1.3)' },
        '-=0.5'
      )

      tl.fromTo(ring3Ref.current,
        { scale: 0, opacity: 0, rotation: -45 },
        { scale: 1, opacity: 0.3, rotation: 0, duration: 0.6, ease: 'back.out(1.2)' },
        '-=0.4'
      )

      // Year text with glitch effect
      tl.fromTo(yearRef.current,
        { y: 30, opacity: 0, skewX: 20 },
        {
          y: 0, opacity: 1, skewX: 0,
          duration: 0.5, ease: 'power3.out',
        },
        '-=0.2'
      )

      // Corners pop in
      tl.fromTo(cornersRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.3, stagger: 0.05, ease: 'back.out(2)',
        },
        '-=0.3'
      )

      // Shapes entrance
      tl.fromTo(shapesRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1, opacity: 0.6, rotation: 0,
          duration: 0.5, stagger: 0.08, ease: 'elastic.out(1, 0.5)',
        },
        '-=0.4'
      )

      // Continuous rotations
      gsap.to(ringRef.current, {
        rotation: 360, duration: 4, ease: 'none', repeat: -1,
      })

      gsap.to(ring2Ref.current, {
        rotation: -360, duration: 6, ease: 'none', repeat: -1,
      })

      gsap.to(ring3Ref.current, {
        rotation: 360, duration: 8, ease: 'none', repeat: -1,
      })

      // Logo breathing
      gsap.to(logoRef.current, {
        scale: 1.08, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })

      // Logo 3D tilt on mouse move
      const handleMouseMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const rotateX = (e.clientY - centerY) / 30
        const rotateY = (e.clientX - centerX) / 30

        gsap.to(logoRef.current, {
          rotateX: -rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      // Floating particles entrance
      const particles = particlesRef.current?.children
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.fromTo(particle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: Math.random() * 0.5 + 0.2,
              duration: Math.random() * 0.5 + 0.3,
              delay: Math.random() * 0.8,
              ease: 'power2.out',
            }
          )

          // Continuous floating
          gsap.to(particle, {
            y: `+=${(Math.random() - 0.5) * 60}`,
            x: `+=${(Math.random() - 0.5) * 40}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 2,
          })
        })
      }

      // Corner brackets pulse
      gsap.to(cornersRef.current, {
        opacity: 0.3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      })

      // Shapes floating
      shapesRef.current.forEach((shape, i) => {
        if (!shape) return
        gsap.to(shape, {
          y: `+=${(Math.random() - 0.5) * 40}`,
          x: `+=${(Math.random() - 0.5) * 30}`,
          rotation: `+=${Math.random() * 60 - 30}`,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      style={{ perspective: '1000px' }}
    >
      {/* Background grid */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(225,157,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,157,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Shimmer line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={shimmerRef}
          className="absolute top-0 h-full w-32 -skew-x-12"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(225,157,0,0.15), transparent)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#e19d00' : i % 3 === 1 ? '#ffffff' : '#ffd700',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      {[
        { top: '15%', left: '20%', size: 20, border: true, rotation: 45 },
        { top: '25%', right: '15%', size: 15, border: true, rotation: 30 },
        { bottom: '20%', left: '25%', size: 25, border: false, rotation: -20 },
        { bottom: '30%', right: '20%', size: 18, border: true, rotation: 60 },
        { top: '40%', left: '10%', size: 12, border: false, rotation: -45 },
        { top: '60%', right: '12%', size: 22, border: true, rotation: 15 },
      ].map((shape, i) => (
        <div
          key={i}
          ref={(el) => { shapesRef.current[i] = el }}
          className="absolute opacity-0"
          style={{
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            border: shape.border ? '1px solid rgba(225,157,0,0.3)' : 'none',
            backgroundColor: shape.border ? 'transparent' : 'rgba(225,157,0,0.1)',
            transform: `rotate(${shape.rotation}deg)`,
          }}
        />
      ))}

      {/* Logo and rings container */}
      <div className="relative flex items-center justify-center" style={{ perspective: '800px' }}>
        {/* Outer ring */}
        <svg
          ref={ring3Ref}
          className="absolute h-[200px] w-[200px] md:h-[260px] md:w-[260px]"
          viewBox="0 0 260 260"
          style={{ opacity: 0 }}
        >
          <circle
            cx="130" cy="130" r="125"
            fill="none" stroke="rgba(225,157,0,0.08)"
            strokeWidth="0.5" strokeDasharray="4 8"
          />
        </svg>

        {/* Middle ring */}
        <svg
          ref={ring2Ref}
          className="absolute h-[170px] w-[170px] md:h-[220px] md:w-[220px]"
          viewBox="0 0 220 220"
          style={{ opacity: 0 }}
        >
          <circle
            cx="110" cy="110" r="105"
            fill="none" stroke="rgba(225,157,0,0.15)"
            strokeWidth="0.5" strokeDasharray="6 4"
          />
          <circle
            cx="110" cy="110" r="100"
            fill="none" stroke="rgba(225,157,0,0.08)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Inner ring */}
        <svg
          ref={ringRef}
          className="absolute h-[140px] w-[140px] md:h-[180px] md:w-[180px]"
          viewBox="0 0 180 180"
          style={{ opacity: 0 }}
        >
          <circle
            cx="90" cy="90" r="85"
            fill="none" stroke="rgba(225,157,0,0.3)"
            strokeWidth="1" strokeDasharray="8 6"
          />
          <circle
            cx="90" cy="90" r="75"
            fill="none" stroke="rgba(225,157,0,0.15)"
            strokeWidth="0.5"
          />
          {/* Glowing dot on ring */}
          <circle
            cx="90" cy="5"
            r="3"
            fill="#e19d00"
            style={{ filter: 'drop-shadow(0 0 6px #e19d00)' }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 90 90"
              to="360 90 90"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Logo */}
        <img
          ref={logoRef}
          src="/daksha/drishti-logo.png"
          alt="Drishti"
          className="relative z-10 h-[60px] w-auto md:h-[80px]"
          style={{ opacity: 0, transformStyle: 'preserve-3d' }}
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
      {[
        'top-6 left-6 border-l-2 border-t-2',
        'top-6 right-6 border-r-2 border-t-2',
        'bottom-6 left-6 border-l-2 border-b-2',
        'bottom-6 right-6 border-r-2 border-b-2',
      ].map((classes, i) => (
        <div
          key={i}
          ref={(el) => { cornersRef.current[i] = el }}
          className={`absolute h-8 w-8 border-gold/40 ${classes}`}
          style={{ opacity: 0 }}
        />
      ))}

      {/* Loading progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gold"
          style={{
            animation: 'loadingBar 1.5s ease-in-out forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen

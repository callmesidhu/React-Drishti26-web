import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function LoadingScreen({ isReady, onComplete }) {
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
 const videoRef = useRef(null)
 const shapesRef = useRef([])
 const readyRef = useRef(isReady)
 const introCompleteRef = useRef(false)
 const exitStartedRef = useRef(false)
 const startExitRef = useRef(null)

 useEffect(() => {
  readyRef.current = isReady
  if (isReady && introCompleteRef.current) startExitRef.current?.()
 }, [isReady])

 useEffect(() => {
 if (videoRef.current) {
 videoRef.current.playbackRate = 3.5
 videoRef.current.defaultPlaybackRate = 3.5
 }

 const ctx = gsap.context(() => {
 const startExit = () => {
  if (exitStartedRef.current) return
  exitStartedRef.current = true

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

  exitTl.to(yearRef.current, {
   y: -30,
   opacity: 0,
   letterSpacing: '20px',
   duration: 0.4,
   ease: 'power2.in',
  }, '-=0.6')

  exitTl.to(cornersRef.current, {
   scale: 0,
   opacity: 0,
   duration: 0.3,
   stagger: 0.02,
   ease: 'power2.in',
  }, '-=0.4')

  exitTl.to(shapesRef.current, {
   scale: 0,
   opacity: 0,
   rotation: '+=360',
   duration: 0.5,
   stagger: 0.03,
   ease: 'power2.in',
  }, '-=0.3')

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

  exitTl.to(containerRef.current, {
   rotationX: 10,
   scale: 0.95,
   opacity: 0,
   duration: 0.5,
   ease: 'power2.inOut',
  }, '-=0.3')
 }

 startExitRef.current = startExit
 const tl = gsap.timeline({
 onComplete: () => {
 introCompleteRef.current = true
 if (readyRef.current) startExit()
 },
 })

 // ---- ENTRANCE ANIMATIONS ----

 gsap.fromTo(videoRef.current,
 { opacity: 0 },
 { opacity: 1, duration: 0.25, ease: 'power2.out' }
 )

 // Background grid fade in
 gsap.fromTo(bgGridRef.current,
 { opacity: 0 },
 { opacity: 0.12, duration: 0.4, delay: 0.1 }
 )

 // Shimmer line sweep
 gsap.fromTo(shimmerRef.current,
 { x: '-100%' },
 { x: '200%', duration: 0.5, delay: 0.1, ease: 'power2.inOut' }
 )

 // Logo with 3D entrance
 tl.fromTo(logoRef.current,
 { scale: 0, rotation: -180, rotationY: 90, opacity: 0 },
 {
 scale: 1, rotation: 0, rotationY: 0, opacity: 1,
 duration: 0.55, ease: 'elastic.out(1, 0.4)',
 }
 )

 // Rings with stagger and rotation
 tl.fromTo(ringRef.current,
 { scale: 0, opacity: 0, rotation: -90 },
 { scale: 1, opacity: 1, rotation: 0, duration: 0.35, ease: 'back.out(1.5)' },
 '-=0.35'
 )

 tl.fromTo(ring2Ref.current,
 { scale: 0, opacity: 0, rotation: 90 },
 { scale: 1, opacity: 0.6, rotation: 0, duration: 0.3, ease: 'back.out(1.3)' },
 '-=0.25'
 )

 tl.fromTo(ring3Ref.current,
 { scale: 0, opacity: 0, rotation: -45 },
 { scale: 1, opacity: 0.3, rotation: 0, duration: 0.25, ease: 'back.out(1.2)' },
 '-=0.2'
 )

 // Year text with glitch effect
 tl.fromTo(yearRef.current,
 { y: 30, opacity: 0, skewX: 20 },
 {
 y: 0, opacity: 1, skewX: 0,
 duration: 0.25, ease: 'power3.out',
 },
 '-=0.15'
 )

 // Corners pop in
 tl.fromTo(cornersRef.current,
 { scale: 0, opacity: 0 },
 {
 scale: 1, opacity: 1,
 duration: 0.2, stagger: 0.03, ease: 'back.out(2)',
 },
 '-=0.15'
 )

 // Shapes entrance
 tl.fromTo(shapesRef.current,
 { scale: 0, opacity: 0, rotation: -180 },
 {
 scale: 1, opacity: 0.6, rotation: 0,
 duration: 0.25, stagger: 0.04, ease: 'elastic.out(1, 0.5)',
 },
 '-=0.2'
 )

 // Hold the reveal visible for ~0.9s so total loading stays around 2s
 tl.to({}, { duration: 0.9 })

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
 {/* Background Video */}
 <video
 ref={videoRef}
 src="/home/ideas-emblem-reveal.webm"
 autoPlay
 muted
 playsInline
 preload="metadata"
 className="absolute top-1/2 left-1/2 z-0 h-[clamp(200px,40vh,500px)] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-100 mix-blend-screen"
 />

 {/* Background grid */}
 <div
 ref={bgGridRef}
 className="absolute inset-0 z-10 opacity-0 pointer-events-none"
 style={{
 backgroundImage: `
 linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
 linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)
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
 background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)',
 }}
 />
 </div>

 {/* Floating particles */}
 <div ref={particlesRef} className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
 {Array.from({ length: 40 }).map((_, i) => (
 <div
 key={i}
 className="absolute rounded-full"
 style={{
 width: `${Math.random() * 6 + 2}px`,
 height: `${Math.random() * 6 + 2}px`,
 backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#ffffff' : '#ffd700',
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
 border: shape.border ? '1px solid rgba(212,175,55,0.3)' : 'none',
 backgroundColor: shape.border ? 'transparent' : 'rgba(212,175,55,0.1)',
 transform: `rotate(${shape.rotation}deg)`,
 }}
 />
 ))}

 {/* Logo and rings container */}
 <div className="relative flex items-center justify-center z-20" style={{ perspective: '800px' }}>
 <div className="hidden" ref={ring3Ref}></div>
 <div className="hidden" ref={ring2Ref}></div>
 <div className="hidden" ref={ringRef}></div>
 <div className="hidden" ref={logoRef}></div>
 </div>

 {/* Text (hidden to preserve GSAP ref) */}
 <div className="hidden" ref={yearRef}></div>

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


 </div>
 )
}

export default LoadingScreen

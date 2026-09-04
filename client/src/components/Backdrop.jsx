import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Backdrop({ theme = 'gold' }) {
 const gradientRef = useRef(null)
 const gridRef = useRef(null)
 const linesRef = useRef(null)
 const cornersRef = useRef([])

 const isBlue = theme === 'blue'

 useEffect(() => {
 const ctx = gsap.context(() => {
 gsap.to(gradientRef.current, {
 opacity: 0.5,
 duration: 4,
 ease: 'sine.inOut',
 yoyo: true,
 repeat: -1,
 })

 gsap.to(gridRef.current, {
 y: 30,
 duration: 20,
 ease: 'none',
 yoyo: true,
 repeat: -1,
 })

 if (linesRef.current) {
 const lines = linesRef.current.children
 gsap.fromTo(lines[0], { y: -50 }, { y: 50, duration: 15, ease: 'sine.inOut', yoyo: true, repeat: -1 })
 gsap.fromTo(lines[1], { y: 50 }, { y: -50, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 })
 }

 cornersRef.current.forEach((corner, i) => {
 if (corner) {
 gsap.to(corner, {
 opacity: 0.2,
 duration: 2 + i * 0.5,
 ease: 'sine.inOut',
 yoyo: true,
 repeat: -1,
 })
 }
 })
 })

 return () => ctx.revert()
 }, [])

 return (
 <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
 <div
 ref={gradientRef}
 className="absolute inset-0"
 style={{
 background: isBlue
 ? `
 radial-gradient(45% 40% at 20% 10%, rgba(0, 102, 255, 0.16), transparent 70%),
 radial-gradient(50% 50% at 85% 35%, rgba(56, 189, 248, 0.12), transparent 75%),
 radial-gradient(60% 55% at 50% 90%, rgba(0, 80, 200, 0.08), transparent 80%),
 radial-gradient(35% 30% at 50% 45%, rgba(0, 210, 255, 0.06), transparent 60%)
 `
 : `
 radial-gradient(45% 40% at 20% 10%, rgba(212, 175, 55, 0.14), transparent 70%),
 radial-gradient(50% 50% at 85% 35%, rgba(212, 175, 55, 0.10), transparent 75%),
 radial-gradient(60% 55% at 50% 90%, rgba(212, 175, 55, 0.08), transparent 80%),
 radial-gradient(35% 30% at 50% 45%, rgba(255, 215, 0, 0.05), transparent 60%)
 `,
 }}
 />

 <svg ref={gridRef} className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <pattern id={isBlue ? "brutalist-grid-blue" : "brutalist-grid"} width="60" height="60" patternUnits="userSpaceOnUse">
 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.75" className={isBlue ? "text-sky-400" : "text-gold-gradient"} />
 <path d="M 57 60 H 63 M 60 57 V 63" fill="none" stroke="currentColor" strokeWidth="0.8" className={isBlue ? "text-sky-400" : "text-gold-gradient"} />
 </pattern>
 </defs>
 <rect width="100%" height="100%" fill={`url(#${isBlue ? "brutalist-grid-blue" : "brutalist-grid"})`} />
 </svg>

 <div ref={linesRef} className="absolute inset-0 opacity-25">
 <div className={`absolute -top-40 left-1/4 h-[800px] w-[1px] rotate-[35deg] bg-gradient-to-b from-transparent ${isBlue ? 'via-sky-400/40' : 'via-gold/40'} to-transparent`} />
 <div className={`absolute top-1/3 -right-20 h-[1000px] w-[1px] -rotate-[35deg] bg-gradient-to-b from-transparent ${isBlue ? 'via-sky-400/30' : 'via-gold/30'} to-transparent`} />
 </div>

 <div ref={(el) => { cornersRef.current[0] = el }} className={`absolute top-6 left-6 h-8 w-8 border-l-2 border-t-2 ${isBlue ? 'border-sky-400/40' : 'border-gold/40'}`} />
 <div ref={(el) => { cornersRef.current[1] = el }} className={`absolute top-6 right-6 h-8 w-8 border-r-2 border-t-2 ${isBlue ? 'border-sky-400/40' : 'border-gold/40'}`} />
 <div ref={(el) => { cornersRef.current[2] = el }} className={`absolute bottom-6 left-6 h-8 w-8 border-l-2 border-b-2 ${isBlue ? 'border-sky-400/40' : 'border-gold/40'}`} />
 <div ref={(el) => { cornersRef.current[3] = el }} className={`absolute bottom-6 right-6 h-8 w-8 border-r-2 border-b-2 ${isBlue ? 'border-sky-400/40' : 'border-gold/40'}`} />

 <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
 <filter id="grain">
 <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
 </filter>
 <rect width="100%" height="100%" filter="url(#grain)" />
 </svg>

 <div
 className="absolute inset-0"
 style={{ boxShadow: 'inset 0 0 180px 60px rgba(0, 0, 0, 0.85)' }}
 />
 </div>
 )
}

export default Backdrop

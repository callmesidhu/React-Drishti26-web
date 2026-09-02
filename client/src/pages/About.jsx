import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)



function About({ embedded = false }) {
 const heroRef = useRef(null)
 const introRef = useRef(null)
 const h1Ref = useRef(null)
 const subheadRef = useRef(null)

 useEffect(() => {
 const els = [
 h1Ref.current,
 subheadRef.current,
 ]
 els.forEach(applyLetterGradient)
 }, [])

 useEffect(() => {
 const ctx = gsap.context(() => {
 // Hero entrance
 gsap.fromTo(h1Ref.current, { y: 80, opacity: 0, scale: 0.9 }, {
 y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
 })
 gsap.fromTo(subheadRef.current, { y: 40, opacity: 0 }, {
 y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3,
 })

 // Intro paragraph
 gsap.fromTo(introRef.current, { y: 30, opacity: 0 }, {
 y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
 scrollTrigger: { trigger: introRef.current, start: 'top 85%' },
 })






 })

 return () => ctx.revert()
 }, [])



 return (
 <div className={`relative min-h-svh w-full overflow-hidden ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
 {!embedded && <Backdrop />}
 {!embedded && <Navbar activeSection="about" />}

 <header
 ref={heroRef}
 className="px-[clamp(16px,4vw,40px)] pt-[clamp(40px,8vw,80px)] text-center"
 >
 <p className="text-[11px] uppercase tracking-[6px] text-gold/60">About Us</p>
 <h1
 ref={h1Ref}
 className="text-[clamp(32px,8vw,120px)] font-bold uppercase leading-none tracking-tight text-gold-gradient"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 Drishti
 </h1>
 <p
 ref={subheadRef}
 className="mt-2 text-[clamp(18px,3vw,28px)] uppercase tracking-[0.3em] text-gold/80"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 Technical Festival
 </p>
 </header>

 <section ref={introRef} className="mx-auto max-w-[800px] px-[clamp(16px,4vw,40px)] py-[clamp(32px,5vw,60px)] text-center" style={{ opacity: 0 }}>
 <p className="text-[clamp(16px,1.8vw,20px)] leading-relaxed text-white/70">
 The flagship annual technical festival of KSIT — celebrating innovation, creativity, and engineering excellence.
 </p>
 </section>



 {!embedded && <Footer />}
 </div>
 )
}

export default About

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import EventDetailsModal from '../components/EventDetailsModal.jsx'
import { workshopsData } from '../data/eventsData.js'
import { applyLetterGradient } from '../utils/letterGradient.js'

const workshops = workshopsData
const TOTAL = workshops.length

function getCarouselTransform(index, activeIndex) {
 const offset = index - activeIndex
 const normalized = Math.abs(offset) > TOTAL / 2 ? offset - Math.sign(offset) * TOTAL : offset
 const abs = Math.abs(normalized)

 return {
 x: normalized * 120,
 y: abs * 8,
 rotateY: normalized * -22,
 scale: 1 - abs * 0.08,
 opacity: abs > 2 ? 0 : 1 - abs * 0.26,
 zIndex: TOTAL - abs,
 }
}

function Workshops() {
 const { slug } = useParams()
 const routerNavigate = useNavigate()
 const [activeIndex, setActiveIndex] = useState(0)
 const activeIndexRef = useRef(0)
 const busyRef = useRef(false)

 const selectedModalEvent = slug ? workshops.find((w) => w.slug === slug) : null

 useEffect(() => {
 if (slug) {
 const idx = workshops.findIndex((w) => w.slug === slug)
 if (idx !== -1) {
 setActiveIndex(idx)
 activeIndexRef.current = idx
 }
 }
 }, [slug])

 const h1Ref = useRef(null)
 const titleRef = useRef(null)
 const descRef = useRef(null)
 const btnRef = useRef(null)
 const deckRef = useRef(null)
 const cardRefs = useRef([])
 const dotsRef = useRef([])

 useEffect(() => {
 if (!h1Ref.current) return
 const textSpan = h1Ref.current.querySelector('.workshops-text')
 if (textSpan) applyLetterGradient(textSpan)
 }, [])

 useEffect(() => {
 if (titleRef.current) {
 titleRef.current.textContent = workshops[activeIndex].title
 applyLetterGradient(titleRef.current)
 }
 }, [activeIndex])

 useLayoutEffect(() => {
 const ctx = gsap.context(() => {
 gsap.fromTo(h1Ref.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 })

 const cards = cardRefs.current
 if (cards.length) {
 gsap.set(cards, (i) => {
 const { x, y, rotateY, scale, opacity, zIndex } = getCarouselTransform(i, 0)
 return { x, y, rotateY, scale, opacity, zIndex }
 })
 }

 gsap.fromTo([titleRef.current, descRef.current, btnRef.current],
 { y: 20, opacity: 0 },
 { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.35 },
 )
 })

 return () => ctx.revert()
 }, [])

 function transitionTo(newIndex) {
 if (busyRef.current || newIndex === activeIndexRef.current) return
 busyRef.current = true
 const prevIndex = activeIndexRef.current
 activeIndexRef.current = newIndex
 const ws = workshops[newIndex]

 workshops.forEach((_, i) => {
 const el = cardRefs.current[i]
 if (!el) return

 const target = getCarouselTransform(i, newIndex)
 gsap.set(el, { zIndex: target.zIndex })
 gsap.to(el, {
 x: target.x,
 y: target.y,
 rotateY: target.rotateY,
 scale: target.scale,
 opacity: target.opacity,
 duration: i === prevIndex ? 0.55 : 0.45,
 ease: i === prevIndex ? 'power2.inOut' : 'power2.out',
 delay: i === prevIndex ? 0 : 0.06,
 })
 })

 gsap.to(titleRef.current, { opacity: 0, y: -15, duration: 0.2 })
 gsap.to(descRef.current, { opacity: 0, y: 15, duration: 0.2 })
 gsap.to(btnRef.current, { opacity: 0, duration: 0.2 })

 setTimeout(() => {
 setActiveIndex(newIndex)
 descRef.current.textContent = ws.description

 gsap.fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 })
 gsap.fromTo(descRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.05 })
 gsap.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.1 })

 dotsRef.current.forEach((dot, i) => {
 if (!dot) return
 if (i === newIndex) {
 dot.classList.add('w-10', 'bg-gold-gradient', '')
 dot.classList.remove('w-3', 'bg-gold/30')
 } else {
 dot.classList.remove('w-10', 'bg-gold-gradient', '')
 dot.classList.add('w-3', 'bg-gold/30')
 }
 })

 busyRef.current = false
 }, 200)
 }

 const goNext = () => transitionTo((activeIndexRef.current + 1) % TOTAL)
 const goPrev = () => transitionTo((activeIndexRef.current - 1 + TOTAL) % TOTAL)
 const active = workshops[activeIndex]

 return (
 <div className="relative min-h-screen w-full overflow-x-hidden">
 <Backdrop />
 <Navbar activeSection="workshops" />

 <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[clamp(24px,4vh,48px)] px-[clamp(16px,4vw,40px)] pb-16 pt-[clamp(100px,16vh,140px)]">
 {/* Heading */}
 <h1
 ref={h1Ref}
 className="text-center text-[clamp(32px,8vw,80px)] font-bold uppercase leading-none tracking-tight"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 <span className="workshops-text">WORKSHOPS</span>
 </h1>

 {/* Carousel + nav buttons */}
 <div className="flex w-full items-center justify-center gap-3 md:gap-6">
 <button
 type="button"
 onClick={goPrev}
 className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 text-base text-gold-gradient transition-all duration-200 hover:border-gold hover:bg-gold/15 cursor-pointer md:h-14 md:w-14"
 aria-label="Previous workshop"
 >
 ←
 </button>

 <div className="relative aspect-[4/5] w-full max-w-[240px] shrink-0 md:max-w-[320px]">
 <div
 ref={deckRef}
 className="relative h-full w-full cursor-pointer overflow-hidden"
 style={{ perspective: '1600px' }}
 >
 {workshops.map((ws, i) => (
 <div
 key={ws.id}
 ref={(el) => { cardRefs.current[i] = el }}
 onClick={() => transitionTo(i)}
 className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border-2 border-white/15 bg-black/60 p-2 backdrop-blur-md will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
 style={{ transformStyle: 'preserve-3d' }}
 >
 {ws.image ? (
 <img src={ws.image} alt={ws.title} className="block h-full w-full rounded-2xl object-cover" />
 ) : (
 <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#111111] px-4 text-center">
 <span
 className="text-sm font-semibold uppercase tracking-wider text-gold-gradient md:text-base"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 {ws.title}
 </span>
 </div>
 )}
 </div>
 ))}
 </div>
 </div>

 <button
 type="button"
 onClick={goNext}
 className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 text-base text-gold-gradient transition-all duration-200 hover:border-gold hover:bg-gold/15 cursor-pointer md:h-14 md:w-14"
 aria-label="Next workshop"
 >
 →
 </button>
 </div>

 {/* Dots */}
 <div className="flex items-center gap-2.5">
 {workshops.map((_, i) => (
 <button
 key={i}
 type="button"
 onClick={() => transitionTo(i)}
 ref={(el) => { dotsRef.current[i] = el }}
 className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
 i === activeIndex ? 'w-10 bg-gold-gradient ' : 'w-3 bg-gold/30 hover:bg-gold/60'
 }`}
 aria-label={`Go to workshop ${i + 1}`}
 />
 ))}
 </div>

 {/* Text content + CTA — page scrolls to reach this if it doesn't fit */}
 <div className="flex w-full max-w-[560px] flex-col items-center gap-4 text-center">
 <p className="text-[10px] uppercase tracking-[5px] text-gold/60">Drishti 2026</p>

 <h2
 ref={titleRef}
 className="text-[clamp(24px,5vw,44px)] font-bold uppercase tracking-wide"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 {active.title}
 </h2>

 <p ref={descRef} className="text-sm leading-relaxed text-white/70 md:text-[15px]">
 {active.description}
 </p>

 <button
 ref={btnRef}
 type="button"
 onClick={() => routerNavigate(`/workshops/${active.slug}`)}
 className="inline-flex items-center justify-center gap-2 rounded-[50px] border border-[#D4AF37]/70 bg-gold-gradient px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:brightness-110 md:text-sm cursor-pointer"
 >
 View Details
 </button>
 </div>
 </main>

 {selectedModalEvent && (
 <EventDetailsModal
 event={selectedModalEvent}
 onClose={() => routerNavigate('/workshops')}
 />
 )}
 </div>
 )
}

export default Workshops
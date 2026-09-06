import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import EventDetailsModal from '../components/EventDetailsModal.jsx'
import Footer from '../components/Footer.jsx'
import dakshaJson from '../data/daksha.json'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const events = dakshaJson.dakshaEventsData

function formatDetail(line) {
 const formatted = line
 .replace(/^Open to:\s*/i, 'Open to — ')
 .replace(/^Evaluation:\s*/i, 'Evaluation — ')
 .replace(/^Grand Finale:\s*/i, 'Grand Finale — ')
 .replace(/•/g, '·')

 if (formatted.includes(' — ')) {
 const [label, ...rest] = formatted.split(' — ')
 return (
 <span>
 <span className="font-semibold text-sky-400">{label} — </span>
 <span className="text-white/85">{rest.join(' — ')}</span>
 </span>
 )
 }
 return <span className="text-white/85">{formatted}</span>
}

function Daksha() {
 const { slug } = useParams()
 const routerNavigate = useNavigate()
 const selectedModalEvent = slug ? events.find((e) => e.slug === slug) : null
 const h1Ref = useRef(null)
 const eventsLabelRef = useRef(null)

 useEffect(() => {
 document.body.classList.add('theme-blue')
 applyLetterGradient(h1Ref.current, 'text-blue-gradient')
 applyLetterGradient(eventsLabelRef.current, 'text-blue-gradient')

 const ctx = gsap.context(() => {
 const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
 tl.fromTo(h1Ref.current, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1 })
 tl.fromTo(eventsLabelRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
 })

 return () => {
 document.body.classList.remove('theme-blue')
 ctx.revert()
 }
 }, [])

 return (
 <>
 <div className="theme-blue relative h-svh max-h-svh w-full overflow-hidden flex flex-col justify-center text-sky-400 select-none touch-none">
 <Backdrop theme="blue" />

 <Navbar activeSection="daksha" theme="blue" />

 <section className="relative h-full w-full flex flex-col justify-center items-center pt-16 pb-4">
 <header className="px-[clamp(16px,4vw,40px)] pb-3 text-center">
 <h1
 ref={h1Ref}
 className="text-[clamp(36px,6vw,68px)] font-bold uppercase leading-[0.95] tracking-tight"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 DAKSHA
 </h1>
 <p
 ref={eventsLabelRef}
 className="text-[22px] md:text-[26px] uppercase tracking-[4px]"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 EVENTS
 </p>
 </header>

 <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 pb-16 pt-8 md:px-8">
 <div className="grid w-full max-w-[1100px] grid-cols-1 place-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4">
 {events.map((event) => (
 <button
 key={event.slug}
 type="button"
 onClick={() => routerNavigate(`/daksha/${event.slug}`)}
 className="group w-full max-w-[320px] rounded-2xl border border-white/10 bg-black/30 p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/40"
 >
 <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
 <img
 src={event.image}
 alt={event.alt || event.title}
 loading="lazy"
 decoding="async"
 className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
 />
 </div>
 <div className="mt-4 flex items-center justify-between gap-3">
 <h2
 className="text-base font-bold uppercase tracking-[0.08em] text-white/90"
 style={{ fontFamily: "'Clash Display-Medium', 'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 {event.title}
 </h2>
 <span
 className="rounded-md border border-sky-400/30 bg-sky-400/10 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-sky-400/80"
 style={{ fontFamily: "'Clash Display-Medium', 'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 EVENT
 </span>
 </div>
 </button>
 ))}
 </div>
 </main>
 </section>

 {/* View Details Popup Modal */}
 {selectedModalEvent && (
 <EventDetailsModal
 event={selectedModalEvent}
 onClose={() => routerNavigate('/daksha')}
 />
 )}
 </div>
 <Footer />
 </>
 )
}

export default Daksha

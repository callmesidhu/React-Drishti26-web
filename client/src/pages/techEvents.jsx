import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import EventDetailsModal from '../components/EventDetailsModal.jsx'
import { competitionsData, workshopsData, technicalEventsData } from '../data/eventsData.js'

const tabs = [
 { key: 'workshop', label: 'Workshops' },
 { key: 'competition', label: 'Competitions' },
]

function TechEvents() {
 const { slug } = useParams()
 const location = useLocation()
 const routerNavigate = useNavigate()
 const [activeTab, setActiveTab] = useState('workshop')
 const [selectedArea, setSelectedArea] = useState('All')
 const [selectedEvent, setSelectedEvent] = useState(null)

 useEffect(() => {
 if (!slug) {
 setSelectedEvent(null)
 return
 }

 const event = technicalEventsData.find((item) => item.slug === slug)
 if (event) {
 setSelectedEvent(event)
 setActiveTab(event.type)
 }
 }, [slug])

 const areaOptions = useMemo(() => {
 const areaSet = new Set()
 const source = activeTab === 'workshop' ? workshopsData : competitionsData

 source.forEach((event) => {
 if (event.area) areaSet.add(event.area)
 })

 return ['All', ...Array.from(areaSet)]
 }, [activeTab])

 useEffect(() => {
 setSelectedArea('All')
 }, [activeTab])

 useEffect(() => {
 const nextPath = activeTab === 'workshop' ? '/workshops' : '/competitions'
 if (location.pathname !== nextPath) {
 routerNavigate(nextPath, { replace: true })
 }
 }, [activeTab, routerNavigate, location.pathname])

 const visibleEvents = useMemo(() => {
 const source = activeTab === 'workshop' ? workshopsData : competitionsData

 return source.filter((event) => {
 if (selectedArea === 'All') return true
 return event.area === selectedArea
 })
 }, [activeTab, selectedArea])

 const handleCloseModal = () => {
 setSelectedEvent(null)
 routerNavigate('/workshops')
 }

 return (
 <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-white">
 <Backdrop />
 <Navbar activeSection="workshops" />

 <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 pb-16 pt-[clamp(100px,14vh,140px)] md:px-8">
 <div className="text-center">
 <p className="mb-3 text-[11px] uppercase tracking-[0.5em] text-gold/70">Drishti 2026</p>
 <h1
 className="text-[clamp(32px,6vw,72px)] font-bold uppercase leading-none text-gold-gradient"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 Technical Events
 </h1>
 </div>

 <div className="flex w-full max-w-[430px] flex-col items-center gap-4">
 <div className="flex w-full rounded-xl border border-gold/30 bg-black/30 p-1 backdrop-blur-sm">
 {tabs.map((tab) => (
 <button
 key={tab.key}
 type="button"
 onClick={() => setActiveTab(tab.key)}
 className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
 activeTab === tab.key
 ? 'bg-gold-gradient text-black '
 : 'text-gold/80 hover:bg-gold/5 hover:text-gold-gradient'
 }`}
 >
 {tab.label}
 </button>
 ))}
 </div>

 <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm text-white/80">
 <label htmlFor="event-area" className="text-[10px] uppercase tracking-[0.28em] text-gold/80">
 Filter by area
 </label>
 <select
 id="event-area"
 value={selectedArea}
 onChange={(event) => setSelectedArea(event.target.value)}
 className="rounded-lg border border-gold/30 bg-[#0d0d0d] px-3 py-2 text-xs uppercase tracking-[0.12em] text-gold-gradient outline-none scheme-dark"
 >
 {areaOptions.map((area) => (
 <option key={area} value={area} className="bg-[#0d0d0d] text-gold">
 {area}
 </option>
 ))}
 </select>
 </div>
 </div>

 {visibleEvents.length === 0 ? (
 <div className="rounded-2xl border border-gold/20 bg-black/30 px-8 py-12 text-center text-gold/80">
 No technical events available for this area.
 </div>
 ) : (
 <div className="grid w-full max-w-[1100px] grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {visibleEvents.map((event) => (
 <button
 key={`${event.type}-${event.id}`}
 type="button"
 onClick={() => setSelectedEvent(event)}
 className="group flex h-[500px] w-full max-w-[320px] flex-col rounded-2xl border border-white/10 bg-black/30 p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
 >
 <div className="aspect-[4/5] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
 {event.image ? (
 <img
 src={event.image}
 alt={event.alt || event.title}
 className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
 />
 ) : (
 <div className="flex h-full w-full items-center justify-center px-4 text-center">
 <span className="text-sm font-semibold uppercase tracking-wider text-gold-gradient">
 {event.title}
 </span>
 </div>
 )}
 </div>
 <div className="mt-4 flex min-h-[64px] flex-1 items-start justify-between gap-3">
 <h2
 className="text-base font-bold uppercase tracking-[0.08em] text-white/90"
 style={{ fontFamily: "'Clash Display-Medium', 'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 {event.title}
 </h2>
 <span
 className="rounded-md border border-gold/30 bg-gold/8 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-gold/80"
 style={{ fontFamily: "'Clash Display-Medium', 'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 {event.area}
 </span>
 </div>
 </button>
 ))}
 </div>
 )}
 </main>

 {selectedEvent && (
 <EventDetailsModal
 event={selectedEvent}
 onClose={handleCloseModal}
 />
 )}
 </div>
 )
}

export default TechEvents
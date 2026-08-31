import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import EventDetailsModal from '../components/EventDetailsModal.jsx'
import { dakshaEventsData } from '../data/eventsData.js'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const events = dakshaEventsData

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
  const heroRef = useRef(null)
  const eventSectionRef = useRef(null)
  const eventContentRef = useRef(null)
  const eventImageRef = useRef(null)
  const eventDetailsRef = useRef(null)
  const eventBtnRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  const h1Ref = useRef(null)
  const eventsLabelRef = useRef(null)
  const eventH2Refs = useRef([])

  useEffect(() => {
    document.body.classList.add('theme-blue')
    applyLetterGradient(h1Ref.current, 'text-blue-gradient')
    applyLetterGradient(eventsLabelRef.current, 'text-blue-gradient')
    eventH2Refs.current.forEach((el) => applyLetterGradient(el, 'text-blue-gradient'))

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(h1Ref.current, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1 })
      tl.fromTo(eventsLabelRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')

      if (eventContentRef.current) {
        gsap.fromTo(eventContentRef.current, { x: -60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: eventSectionRef.current, start: 'top 75%' },
        })
      }
      if (eventImageRef.current) {
        gsap.fromTo(eventImageRef.current, { x: 60, opacity: 0, scale: 0.95 }, {
          x: 0, opacity: 1, scale: 1, duration: 0.8,
          scrollTrigger: { trigger: eventSectionRef.current, start: 'top 75%' },
        })
      }
      if (eventDetailsRef.current) {
        gsap.fromTo(eventDetailsRef.current.children, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.5,
          scrollTrigger: { trigger: eventDetailsRef.current, start: 'top 80%' },
        })
      }
      if (eventBtnRef.current) {
        gsap.fromTo(eventBtnRef.current, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.5,
          scrollTrigger: { trigger: eventBtnRef.current, start: 'top 90%' },
        })
      }

      gsap.fromTo(scrollIndicatorRef.current, { opacity: 0 }, {
        opacity: 1, duration: 1, delay: 1.5,
      })
      gsap.to(scrollIndicatorRef.current?.querySelector('svg'), {
        y: 8, duration: 0.8, ease: 'power1.inOut', yoyo: true, repeat: -1,
      })
    })

    return () => {
      document.body.classList.remove('theme-blue')
      ctx.revert()
    }
  }, [])

  return (
    <div className="theme-blue relative h-svh max-h-svh w-full overflow-hidden flex flex-col justify-center text-sky-400 select-none touch-none">
      <Backdrop theme="blue" />

      <Navbar activeSection="daksha" theme="blue" />

      <section ref={heroRef} className="relative h-full w-full flex flex-col justify-center items-center pt-16 pb-4">
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

        <main className="mx-auto flex w-full max-w-[1180px] flex-col justify-center px-[clamp(16px,4vw,40px)]">
          {events.map((event, i) => (
            <section
              key={event.title}
              ref={eventSectionRef}
              className="flex flex-col items-center border-t border-sky-500/30 pt-4 text-center md:grid md:grid-cols-2 md:items-center md:gap-x-12 md:gap-y-4 md:text-left"
            >
              <div ref={eventContentRef} className="order-1 flex flex-col items-center md:col-start-1 md:row-start-1 md:items-start" style={{ opacity: 0 }}>
                <p className="text-[11px] uppercase tracking-[4px] text-sky-400/70">{event.guidelines}</p>
                <h2
                  ref={(el) => { eventH2Refs.current[i] = el }}
                  style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
                  className="mt-2 text-[clamp(26px,4vw,44px)] font-bold uppercase leading-[0.98] tracking-tight"
                >
                  {event.title}
                </h2>

                <ul ref={eventDetailsRef} className="mt-4 flex flex-col gap-2.5">
                  {event.details.map((line, j) => (
                    <li key={j} className="text-xs md:text-sm leading-[1.6] text-sky-100/80" style={{ opacity: 0 }}>
                      {formatDetail(line)}
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={eventImageRef} className="relative order-2 mt-4 md:mt-0 w-full max-w-[240px] md:max-w-[300px] mx-auto border border-sky-500/40 bg-black/40 p-2 backdrop-blur-sm md:col-start-2 md:row-start-1 md:row-span-2 shadow-[0_0_40px_rgba(56,189,248,0.25)]" style={{ opacity: 0 }}>
                  <img className="block aspect-[4/5] w-full object-cover" src={event.image} alt={event.alt} />
              </div>

              <div className="order-3 mt-4 md:mt-0 md:col-start-1 md:row-start-2">
                <button
                  ref={eventBtnRef}
                  type="button"
                  onClick={() => routerNavigate(`/daksha/${event.slug}`)}
                  className="inline-block border border-sky-300/80 bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#0ea5e9] px-8 py-2.5 text-xs font-black uppercase tracking-[3px] text-black transition-all duration-300 hover:brightness-110 cursor-pointer"
                  style={{ opacity: 0 }}
                >
                  View Details
                </button>
              </div>
            </section>
          ))}
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
  )
}

export default Daksha

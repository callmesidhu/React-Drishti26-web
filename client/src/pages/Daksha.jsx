import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import Team from './Team.jsx'
import About from './About.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    title: 'Shark Tank',
    image: '/daksha/shark-tank.png',
    alt: 'Shark Tank event',
    guidelines: 'Shark tank guidelines',
    registerUrl: 'https://snaptiqz.com/event/shark-tank',
    details: [
      'Open to: Student founders, startups in ideation/early-growth stages & registered MSMEs.',
      'Initial Screening → Expert Panel Pitch → Grand Finale with Investors.',
      'Pitch your startup before industry experts and investors.',
      'Evaluation: Innovation • Market Potential • Business Model • Scalability • Investment Potential.',
      'Grand Finale: 19 September 2026.',
    ],
  },
]

function formatDetail(line) {
  return line
    .replace(/^Open to:\s*/i, 'Open to — ')
    .replace(/^Evaluation:\s*/i, 'Evaluation — ')
    .replace(/^Grand Finale:\s*/i, 'Grand Finale — ')
    .replace(/•/g, '·')
}

function Daksha() {
  const [activeSection, setActiveSection] = useState('daksha')
  const location = useLocation()
  const teamSectionRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const contactSectionRef = useRef(null)
  const wrapperRef = useRef(null)
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
    applyLetterGradient(h1Ref.current)
    applyLetterGradient(eventsLabelRef.current)
    eventH2Refs.current.forEach(applyLetterGradient)

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

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }
  }, [location])

  useEffect(() => {
    const teamSection = teamSectionRef.current
    if (!teamSection) return

    gsap.fromTo(
      teamSection,
      { y: '100vh' },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
          pin: false,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const teamSection = teamSectionRef.current
      const aboutSection = aboutSectionRef.current
      const contactSection = contactSectionRef.current
      if (!teamSection) return

      const teamRect = teamSection.getBoundingClientRect()
      const aboutRect = aboutSection?.getBoundingClientRect()
      const contactRect = contactSection?.getBoundingClientRect()

      if (contactRect && contactRect.top < window.innerHeight * 0.5) {
        setActiveSection('contact')
      } else if (aboutRect && aboutRect.top < window.innerHeight * 0.5) {
        setActiveSection('about')
      } else if (teamRect.top < window.innerHeight * 0.5) {
        setActiveSection('team')
      } else {
        setActiveSection('daksha')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={wrapperRef} className="relative w-full text-gold">
      <Backdrop />

      <Navbar activeSection={activeSection} />

      <section ref={heroRef} className="relative min-h-svh w-full">
        <header className="px-[clamp(16px,4vw,40px)] pb-8 pt-[clamp(40px,6vw,64px)] text-center">
          <h1
            ref={h1Ref}
            className="mt-3 text-[clamp(44px,8vw,80px)] font-bold uppercase leading-[0.95] tracking-tight font-display drop-shadow-[0_0_25px_rgba(225,157,0,0.35)]"
            style={{ opacity: 0 }}
          >
            Daksha
          </h1>
          <p
            ref={eventsLabelRef}
            className="text-[30px] uppercase tracking-[4px] font-display"
            style={{ opacity: 0 }}
          >
            Events
          </p>
        </header>

        <main className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(56px,8vw,88px)] px-[clamp(16px,4vw,40px)] pb-24">
          {events.map((event, i) => (
            <section
              key={event.title}
              ref={eventSectionRef}
              className="flex flex-col items-center border-t border-gold/30 pt-[clamp(32px,5vw,48px)] text-center md:grid md:grid-cols-2 md:items-center md:gap-x-14 md:gap-y-6 md:text-left"
            >
              <div ref={eventContentRef} className="order-1 flex flex-col items-center md:col-start-1 md:row-start-1 md:items-start" style={{ opacity: 0 }}>
                <p className="text-[11px] uppercase tracking-[4px] text-gold/60">{event.guidelines}</p>
                <h2
                  ref={(el) => { eventH2Refs.current[i] = el }}
                  className="mt-3 text-[clamp(32px,5vw,52px)] font-bold uppercase leading-[0.98] tracking-tight font-display drop-shadow-[0_0_20px_rgba(225,157,0,0.35)]"
                >
                  {event.title}
                </h2>

                <ul ref={eventDetailsRef} className="mt-6 flex flex-col gap-4">
                  {event.details.map((line, j) => (
                    <li key={j} className="leading-[1.7] text-gold/80" style={{ opacity: 0 }}>
                      {formatDetail(line)}
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={eventImageRef} className="relative order-2 mt-8 w-full border border-gold/40 bg-black/40 p-2 backdrop-blur-sm md:order-none md:mt-0 md:col-start-2 md:row-start-1 md:row-span-2" style={{ opacity: 0 }}>
                <div className="absolute -top-1 -left-1 h-3 w-3 border-l-2 border-t-2 border-gold" />
                <div className="absolute -top-1 -right-1 h-3 w-3 border-r-2 border-t-2 border-gold" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-l-2 border-b-2 border-gold" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-r-2 border-b-2 border-gold" />

                <img className="block aspect-[4/5] w-full object-cover" src={event.image} alt={event.alt} />
              </div>

              <div className="order-3 mt-8 md:mt-0 md:col-start-1 md:row-start-2">
                <a
                  ref={eventBtnRef}
                  href={event.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gold bg-gold/5 px-10 py-3 text-xs uppercase tracking-[3px] text-gold transition-all duration-200 hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  style={{ opacity: 0 }}
                >
                  Register
                </a>
              </div>
            </section>
          ))}
        </main>

        <div ref={scrollIndicatorRef} className="flex justify-center pb-16" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center gap-2 text-gold/50">
            <span className="text-xs uppercase tracking-[4px]">Scroll for more</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <div ref={teamSectionRef} id="team-section" className="relative w-full">
        <Team embedded />
      </div>

      <div ref={aboutSectionRef} id="about-section" className="relative w-full min-h-svh">
        <About embedded />
      </div>

      <div ref={contactSectionRef}>
        <Footer />
      </div>
    </div>
  )
}

export default Daksha

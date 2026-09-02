import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 5000, suffix: '+', label: 'Attendees' },
  { number: 50, suffix: '+', label: 'Colleges' },
  { number: 30, suffix: '+', label: 'Events' },
  { number: 10, suffix: '+', label: 'Years' },
]

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and challenge conventions. Every idea has the potential to change the world.',
    icon: '◆',
  },
  {
    title: 'Community',
    description: 'Building bridges between students, industry leaders, and visionaries. Together we grow.',
    icon: '◈',
  },
  {
    title: 'Excellence',
    description: 'We set the bar high and continuously strive to exceed expectations in everything we do.',
    icon: '◇',
  },
]

const timeline = [
  { year: '2016', event: 'Drishti was born with a vision to bridge the gap between academia and industry.' },
  { year: '2018', event: 'Expanded to include hackathons, workshops, and international speakers.' },
  { year: '2020', event: 'Went virtual during the pandemic, reaching audiences across 20+ countries.' },
  { year: '2023', event: 'Returned bigger than ever with 5000+ attendees and 30+ events.' },
  { year: '2026', event: 'Drishti 2026 — the biggest edition yet. Are you ready?' },
]

function About({ embedded = false }) {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)
  const introRef = useRef(null)
  const ctaRef = useRef(null)
  const timelineLineRef = useRef(null)
  const timelineDotsRef = useRef([])
  const statNumberRefs = useRef([])
  const ctaBtnRef = useRef(null)
  const ctaArrowRef = useRef(null)
  const dividersRef = useRef([])

  const h1Ref = useRef(null)
  const subheadRef = useRef(null)
  const numbersHeadRef = useRef(null)
  const valuesHeadRef = useRef(null)
  const journeyHeadRef = useRef(null)
  const ctaHeadRef = useRef(null)
  const statRefs = useRef([])
  const valueH3Refs = useRef([])
  const timelineYearRefs = useRef([])

  useEffect(() => {
    const els = [
      h1Ref.current,
      subheadRef.current,
      numbersHeadRef.current,
      valuesHeadRef.current,
      journeyHeadRef.current,
      ctaHeadRef.current,
      ...statRefs.current.filter(Boolean),
      ...valueH3Refs.current.filter(Boolean),
      ...timelineYearRefs.current.filter(Boolean),
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

      // Divider lines
      dividersRef.current.forEach((divider) => {
        if (divider) {
          gsap.fromTo(divider, { scaleX: 0 }, {
            scaleX: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: divider, start: 'top 90%' },
          })
        }
      })

      // Stats count-up
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        })
      }

      statNumberRefs.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i]
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target.number,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + target.suffix
          },
        })
      })

      // Values cards
      if (valuesRef.current) {
        gsap.fromTo(valuesRef.current.children, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
        })
      }

      // Timeline line draw
      if (timelineLineRef.current) {
        gsap.fromTo(timelineLineRef.current, { scaleY: 0 }, {
          scaleY: 1, duration: 1.5, ease: 'power2.out', transformOrigin: 'top center',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
        })
      }

      // Timeline dots pop-in
      timelineDotsRef.current.forEach((dot) => {
        if (dot) {
          gsap.fromTo(dot, { scale: 0 }, {
            scale: 1, duration: 0.4, ease: 'back.out(2)',
            scrollTrigger: { trigger: dot, start: 'top 85%' },
          })
        }
      })

      // Timeline items
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll(':scope > div')
        gsap.fromTo(items, { opacity: 0, x: (i) => i % 2 === 0 ? -30 : 30 }, {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
        })
      }

      // CTA section
      if (ctaRef.current) {
        gsap.fromTo(ctaHeadRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
        })
        gsap.fromTo(ctaBtnRef.current, { y: 20, opacity: 0, scale: 0.9 }, {
          y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', delay: 0.2,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (ctaBtnRef.current) {
      const btn = ctaBtnRef.current
      const handleEnter = () => gsap.to(ctaArrowRef.current, { x: 5, duration: 0.3, ease: 'power2.out' })
      const handleLeave = () => gsap.to(ctaArrowRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
      btn.addEventListener('mouseenter', handleEnter)
      btn.addEventListener('mouseleave', handleLeave)
      return () => {
        btn.removeEventListener('mouseenter', handleEnter)
        btn.removeEventListener('mouseleave', handleLeave)
      }
    }
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
          className="text-[clamp(32px,8vw,120px)] font-bold uppercase leading-none tracking-tight text-gold-gradient drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
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

      <section ref={introRef} className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)] text-center" style={{ opacity: 0 }}>
        <p className="text-[clamp(16px,2vw,20px)] leading-relaxed text-white/60">
          Drishti is the annual technical festival of KSIT, bringing together the brightest minds
          from across the country. For over a decade, we have been a platform for innovation,
          creativity, and collaboration — where ideas take flight and dreams become reality.
        </p>
      </section>

      <div ref={(el) => { dividersRef.current[0] = el }} className="border-t border-gold/20" style={{ transformOrigin: 'left center' }} />

      <section className="mx-auto max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={numbersHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-[0.12em] text-gold-gradient drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
        >
          Our Numbers
        </h2>
        <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center" style={{ opacity: 0 }}>
              <p
                ref={(el) => { statRefs.current[i] = el; statNumberRefs.current[i] = el }}
                className="text-[clamp(36px,6vw,64px)] font-bold text-gold-gradient"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                0{stat.suffix}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[3px] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div ref={(el) => { dividersRef.current[1] = el }} className="border-t border-gold/20" style={{ transformOrigin: 'left center' }} />

      <section className="mx-auto max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={valuesHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-[0.12em] text-gold-gradient drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
        >
          What We Stand For
        </h2>
        <div ref={valuesRef} className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="border border-gold/20 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-gold/40 hover:bg-[#111] shadow-[0_0_18px_rgba(0,0,0,0.3)]"
              style={{ opacity: 0 }}
            >
              <span className="text-3xl text-gold">{value.icon}</span>
              <h3
                ref={(el) => { valueH3Refs.current[i] = el }}
                className="mt-4 text-xl font-bold uppercase tracking-[0.1em] text-gold-gradient"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div ref={(el) => { dividersRef.current[2] = el }} className="border-t border-gold/20" style={{ transformOrigin: 'left center' }} />

      <section className="mx-auto max-w-[800px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={journeyHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-[0.12em] text-gold-gradient drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
        >
          Our Journey
        </h2>
        <div ref={timelineRef} className="relative mt-12">
          <div ref={timelineLineRef} className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-gold/20 md:left-1/2" style={{ transformOrigin: 'top center' }} />
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`relative mb-12 flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <p
                  ref={(el) => { timelineYearRefs.current[i] = el }}
                  className="text-2xl font-bold text-gold-gradient"
                  style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
                >
                  {item.year}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.event}</p>
              </div>
              <div
                ref={(el) => { timelineDotsRef.current[i] = el }}
                className="relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gold bg-black md:mx-auto"
              />
              <div className="hidden flex-1 md:block" />
            </div>
          ))}
        </div>
      </section>

      <div ref={(el) => { dividersRef.current[3] = el }} className="border-t border-gold/20" style={{ transformOrigin: 'left center' }} />

      <section ref={ctaRef} className="px-[clamp(16px,4vw,40px)] py-[clamp(40px,8vw,100px)] text-center">
        <h2
          ref={ctaHeadRef}
          className="text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-[0.08em] text-gold-gradient drop-shadow-[0_0_18px_rgba(212,175,55,0.2)]"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
        >
          Ready to be part of something extraordinary?
        </h2>
        <a
          ref={ctaBtnRef}
          href="/daksha"
          className="mt-8 inline-flex items-center gap-3 border border-gold bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          style={{ borderRadius: '50px', opacity: 0 }}
        >
          Explore Events
          <svg ref={ctaArrowRef} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </section>

      {!embedded && <Footer />}
    </div>
  )
}

export default About

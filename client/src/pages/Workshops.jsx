import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Competitions from './Competitions.jsx'

gsap.registerPlugin(ScrollTrigger)

const workshops = [
  {
    id: 1,
    title: 'AI & Machine Learning',
    description:
      'Dive deep into the world of artificial intelligence and machine learning. Learn to build intelligent systems, train neural networks, and deploy ML models in real-world applications.',
    image: '/workshops/ai-ml.jpg',
    registerUrl: '#',
  },
  {
    id: 2,
    title: 'Web Development',
    description:
      'Master modern web technologies from frontend frameworks to backend architecture. Build responsive, performant web applications using the latest tools and best practices.',
    image: '/workshops/web-dev.jpg',
    registerUrl: '#',
  },
  {
    id: 3,
    title: 'Cloud Computing',
    description:
      'Explore cloud infrastructure, deployment strategies, and DevOps practices. Learn to architect scalable applications on AWS, Azure, or Google Cloud platforms.',
    image: '/workshops/cloud.jpg',
    registerUrl: '#',
  },
  {
    id: 4,
    title: 'Cybersecurity',
    description:
      'Understand ethical hacking, penetration testing, and security auditing. Protect systems from threats and vulnerabilities with hands-on security techniques.',
    image: '/workshops/cyber.jpg',
    registerUrl: '#',
  },
  {
    id: 5,
    title: 'Blockchain & Web3',
    description:
      'Explore decentralized applications, smart contracts, and the future of the internet. Build on Ethereum and understand the fundamentals of blockchain technology.',
    image: '/workshops/blockchain.jpg',
    registerUrl: '#',
  },
]

function Workshops() {
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const btnRef = useRef(null)
  const imgRef = useRef(null)
  const dotsRef = useRef([])
  const activeIndexRef = useRef(0)
  const busyRef = useRef(false)
  const competitionsSectionRef = useRef(null)

  useEffect(() => {
    if (location.hash === '#competitions-section') {
      const el = document.getElementById('competitions-section')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    }
  }, [location])

  useEffect(() => {
    const section = sectionRef.current
    const competitionsSection = competitionsSectionRef.current
    if (!section) return

    const totalCards = workshops.length
    const scrollPerCard = 400

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${(totalCards - 1) * scrollPerCard}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const newIndex = Math.min(
            totalCards - 1,
            Math.round(progress * (totalCards - 1))
          )
          if (newIndex !== activeIndexRef.current) {
            transitionTo(newIndex)
          }
        },
      })

      if (competitionsSection) {
        gsap.fromTo(
          competitionsSection,
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
      }
    }, wrapperRef)

    function transitionTo(newIndex) {
      if (busyRef.current || newIndex === activeIndexRef.current) return
      busyRef.current = true
      activeIndexRef.current = newIndex
      const ws = workshops[newIndex]

      gsap.to(titleRef.current, { opacity: 0, y: -15, duration: 0.2 })
      gsap.to(descRef.current, { opacity: 0, y: 15, duration: 0.2 })
      gsap.to(btnRef.current, { opacity: 0, duration: 0.2 })
      gsap.to(imgRef.current, { opacity: 0, x: 40, duration: 0.25 })

      setTimeout(() => {
        setActiveIndex(newIndex)
        titleRef.current.textContent = ws.title
        descRef.current.textContent = ws.description
        btnRef.current.href = ws.registerUrl

        gsap.fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 })
        gsap.fromTo(descRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.05 })
        gsap.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.1 })
        gsap.fromTo(imgRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, delay: 0.05 })

        dotsRef.current.forEach((dot, i) => {
          if (!dot) return
          if (i === newIndex) {
            dot.classList.add('w-10', 'bg-gold', 'shadow-[0_0_12px_rgba(225,157,0,0.6)]')
            dot.classList.remove('w-3', 'bg-gold/30')
          } else {
            dot.classList.remove('w-10', 'bg-gold', 'shadow-[0_0_12px_rgba(225,157,0,0.6)]')
            dot.classList.add('w-3', 'bg-gold/30')
          }
        })

        busyRef.current = false
      }, 200)
    }

    return () => ctx.revert()
  }, [])

  const active = workshops[activeIndex]

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Backdrop />
      <Navbar activeSection="workshops" />

      <section
        ref={sectionRef}
        className="relative flex h-svh w-full items-center overflow-hidden px-[clamp(16px,4vw,40px)]"
      >
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[5px] text-gold/60">Drishti 2026</p>

            <h1
              ref={titleRef}
              className="text-[clamp(36px,6vw,64px)] font-bold uppercase leading-[0.95] tracking-tight text-gold-gradient font-display drop-shadow-[0_0_25px_rgba(225,157,0,0.35)]"
            >
              {active.title}
            </h1>

            <p
              ref={descRef}
              className="text-[clamp(14px,1.6vw,17px)] leading-[1.7] text-white/70"
            >
              {active.description}
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                ref={btnRef}
                href={active.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-gold bg-gold/10 px-10 py-3 text-xs font-semibold uppercase tracking-[3px] text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(225,157,0,0.5)]"
              >
                Register Now
              </a>
            </div>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              {workshops.map((ws, i) => (
                <button
                  key={ws.id}
                  ref={(el) => { dotsRef.current[i] = el }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === 0
                      ? 'w-10 bg-gold shadow-[0_0_12px_rgba(225,157,0,0.6)]'
                      : 'w-3 bg-gold/30'
                  }`}
                  aria-label={`Go to workshop ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Single Card */}
          <div className="relative flex items-center justify-center">
            <div
              ref={imgRef}
              className="relative w-full max-w-[380px] overflow-hidden rounded-3xl border-2 border-white/15 bg-black/60 p-2 backdrop-blur-md md:max-w-[420px]"
            >
              <img
                src={active.image}
                alt={active.title}
                className="block aspect-[4/5] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div ref={competitionsSectionRef} id="competitions-section" className="relative w-full min-h-svh">
        <Competitions embedded />
      </div>
    </div>
  )
}

export default Workshops

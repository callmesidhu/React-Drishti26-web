import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

const talksData = [
  {
    id: 'talk-agi',
    title: 'The Next Horizon of Artificial General Intelligence',
    subtitle: 'Keynote Address on Frontier AI & Autonomous Systems',
    category: 'ai',
    speaker: 'Dr. Arjun Sharma',
    role: 'Lead AI Research Scientist',
    organization: 'Google DeepMind',
    avatarInitials: 'AS',
    day: 'Day 1 (18 Sept)',
    time: '10:30 AM - 11:45 AM',
    venue: 'Main Auditorium',
    badge: 'Keynote Talk',
    abstract:
      'Explore the architectural shifts powering large multimodal models, self-correcting neural networks, and the path towards aligned, safe Artificial General Intelligence.',
    takeaways: [
      'Understanding modern reasoning models & step-by-step verification',
      'Autonomous AI agent orchestration frameworks',
      'Ethical considerations and safety guardrails in frontier AI',
    ],
    registerUrl: 'https://snaptiqz.com/event/talk-agi',
  },
  {
    id: 'talk-space',
    title: 'Space Exploration & Indigenous Tech Frontiers',
    subtitle: 'Keynote on Next-Gen Satellite Launchers & Planetary Probes',
    category: 'keynote',
    speaker: 'Dr. Priya Nair',
    role: 'Deputy Director of Space Missions',
    organization: 'ISRO',
    avatarInitials: 'PN',
    day: 'Day 1 (18 Sept)',
    time: '02:00 PM - 03:15 PM',
    venue: 'Main Auditorium',
    badge: 'Keynote Talk',
    abstract:
      'An inspiring dive into indigenous propulsion systems, reusable launch vehicles, deep-space communication relays, and India’s upcoming interstellar endeavors.',
    takeaways: [
      'Cryogenic engine innovations and fuel efficiency gains',
      'SmallSat constellation deployment strategies',
      'Career pathways in aerospace engineering and research',
    ],
    registerUrl: 'https://snaptiqz.com/event/talk-space',
  },
  {
    id: 'talk-startup',
    title: 'Scaling DeepTech Startups from Zero to One',
    subtitle: 'Fireside Chat on Tech Entrepreneurship & Venture Capital',
    category: 'entrepreneurship',
    speaker: 'Vikramaditya Roy',
    role: 'Managing Partner & Co-Founder',
    organization: 'TechVenture Capital',
    avatarInitials: 'VR',
    day: 'Day 2 (19 Sept)',
    time: '11:00 AM - 12:15 PM',
    venue: 'Seminar Hall A',
    badge: 'Fireside Chat',
    abstract:
      'Navigating the journey from campus project to venture-backed global company. Insights into IP protection, product-market fit, and pitching to top-tier VC firms.',
    takeaways: [
      'Validating technical feasibility vs commercial viability',
      'Structuring seed equity & cap table management',
      'Pitch deck teardowns & live Q&A with founders',
    ],
    registerUrl: 'https://snaptiqz.com/event/talk-startup',
  },
  {
    id: 'panel-ethics',
    title: 'Panel: AI Ethics, Automation & Human Destiny',
    subtitle: 'Interactive Multi-Speaker Debate & Townhall Q&A',
    category: 'panel',
    speaker: 'Multi-Speaker Panel',
    role: 'Industry & Academic Leaders',
    organization: 'Drishti Thought Leaders Panel',
    avatarInitials: 'TL',
    day: 'Day 2 (19 Sept)',
    time: '03:00 PM - 04:30 PM',
    venue: 'Grand Amphitheatre',
    badge: 'Panel Discussion',
    abstract:
      'Industry veterans, policy experts, and researchers debate the socio-economic impacts of automated workforce transitions, AI copyright laws, and human-in-the-loop governance.',
    takeaways: [
      'Impact of generative AI on creative and engineering careers',
      'Global regulatory frameworks and copyright compliance',
      'Open audience mic for live debate questions',
    ],
    registerUrl: 'https://snaptiqz.com/event/panel-ethics',
  },
  {
    id: 'talk-quantum',
    title: 'Quantum Computing: Beyond Binary Architectures',
    subtitle: 'Technical Talk on Superconducting Qubits & Error Correction',
    category: 'ai',
    speaker: 'Dr. Meera Vasudevan',
    role: 'Principal Quantum Systems Architect',
    organization: 'IBM Quantum',
    avatarInitials: 'MV',
    day: 'Day 3 (20 Sept)',
    time: '10:30 AM - 11:45 AM',
    venue: 'Seminar Hall B',
    badge: 'Tech Talk',
    abstract:
      'Discover how quantum algorithms solve complex molecular simulations and cryptography problems that would take classical supercomputers millennia to process.',
    takeaways: [
      'Qubit coherence & fault-tolerant error correction',
      'Qiskit programming hands-on walkthrough',
      'Quantum supremacy in post-quantum cryptography',
    ],
    registerUrl: 'https://snaptiqz.com/event/talk-quantum',
  },
]

const agendaData = [
  {
    day: 'Day 1 (18 Sept)',
    sessions: [
      { time: '09:30 AM', title: 'Opening Keynote Registration & Coffee', speaker: 'Drishti Committee', venue: 'Main Auditorium' },
      { time: '10:30 AM', title: 'The Next Horizon of Artificial General Intelligence', speaker: 'Dr. Arjun Sharma (Google DeepMind)', venue: 'Main Auditorium' },
      { time: '02:00 PM', title: 'Space Exploration & Indigenous Tech Frontiers', speaker: 'Dr. Priya Nair (ISRO)', venue: 'Main Auditorium' },
    ],
  },
  {
    day: 'Day 2 (19 Sept)',
    sessions: [
      { time: '11:00 AM', title: 'Scaling DeepTech Startups from Zero to One', speaker: 'Vikramaditya Roy (TechVenture)', venue: 'Seminar Hall A' },
      { time: '03:00 PM', title: 'Panel: AI Ethics, Automation & Human Destiny', speaker: 'Multi-Speaker Panel', venue: 'Grand Amphitheatre' },
    ],
  },
  {
    day: 'Day 3 (20 Sept)',
    sessions: [
      { time: '10:30 AM', title: 'Quantum Computing: Beyond Binary Architectures', speaker: 'Dr. Meera Vasudevan (IBM Quantum)', venue: 'Seminar Hall B' },
      { time: '02:30 PM', title: 'Fireside Q&A & Young Researcher Awards', speaker: 'Drishti Keynote Speakers', venue: 'Main Auditorium' },
    ],
  },
]

const stats = [
  { value: '8+', label: 'Visionary Speakers' },
  { value: '3', label: 'Panel Debates' },
  { value: '2,000+', label: 'Delegates' },
  { value: '100%', label: 'Inspiring' },
]

function Talks({ embedded = false }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeDay, setActiveDay] = useState(0)
  const [selectedTalk, setSelectedTalk] = useState(null)

  const h1Ref = useRef(null)
  const eyebrowRef = useRef(null)
  const gridRef = useRef(null)
  const statValueRefs = useRef([])

  useEffect(() => {
    applyLetterGradient(h1Ref.current)
    applyLetterGradient(eyebrowRef.current)
    statValueRefs.current.forEach(applyLetterGradient)
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    )
  }, [activeCategory])

  const filteredTalks =
    activeCategory === 'all'
      ? talksData
      : talksData.filter((talk) => talk.category === activeCategory)

  return (
    <div className={`relative min-h-svh w-full text-gold ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="talks" />}

      {/* Hero Header */}
      <header className="px-[clamp(16px,4vw,40px)] pb-6 pt-[clamp(40px,6vw,64px)] text-center">
        <p ref={eyebrowRef} className="text-[11px] uppercase tracking-[6px] text-gold/60 font-display">
          Drishti 2026 Thought Leadership
        </p>
        <h1
          ref={h1Ref}
          className="mt-3 text-[clamp(40px,8vw,90px)] font-bold uppercase leading-[0.95] tracking-tight font-display drop-shadow-[0_0_30px_rgba(225,157,0,0.35)]"
        >
          Talks & Panels
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-[clamp(14px,1.6vw,17px)] leading-relaxed text-white/70">
          Listen to visionary keynotes, deep tech insights, and multi-speaker panel debates with industry pioneers from Google DeepMind, ISRO, IBM Quantum, and leading VC firms.
        </p>

        {/* Stats Row */}
        <div className="mx-auto mt-10 grid max-w-[850px] grid-cols-2 gap-4 rounded-2xl border border-gold/20 bg-black/40 p-6 backdrop-blur-md sm:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <span
                ref={(el) => { statValueRefs.current[idx] = el }}
                className="block text-[clamp(24px,4vw,38px)] font-bold tracking-tight font-display"
              >
                {stat.value}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[2px] text-white/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] pt-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'keynote', label: 'Keynotes' },
            { id: 'ai', label: 'AI & DeepTech' },
            { id: 'entrepreneurship', label: 'Startups & VC' },
            { id: 'panel', label: 'Panels & Debates' },
          ].map((tab) => {
            const isSelected = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[2px] transition-all duration-300 ${
                  isSelected
                    ? 'bg-gold-gradient text-black shadow-[0_0_20px_rgba(225,157,0,0.5)]'
                    : 'border border-gold/30 bg-black/50 text-gold/80 hover:border-gold hover:text-gold'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Speaker & Talks Cards Grid */}
      <main className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] py-12">
        <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
          {filteredTalks.map((talk) => (
            <article
              key={talk.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 bg-black/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:bg-black/70 hover:shadow-[0_0_30px_rgba(225,157,0,0.2)] md:p-8"
            >
              {/* Golden Corner Markers */}
              <div className="absolute -top-1 -left-1 h-3.5 w-3.5 border-l-2 border-t-2 border-gold" />
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 border-r-2 border-t-2 border-gold" />
              <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 border-l-2 border-b-2 border-gold" />
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-r-2 border-b-2 border-gold" />

              <div>
                {/* Badge & Timing */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-4">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
                    {talk.badge}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    {talk.day}
                  </span>
                </div>

                {/* Speaker Avatar & Bio Header */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gradient-to-br from-gold/30 via-black to-gold/10 text-lg font-bold text-gold font-display shadow-[0_0_15px_rgba(225,157,0,0.3)]">
                    {talk.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gold font-display">
                      {talk.speaker}
                    </h3>
                    <p className="text-xs text-white/70">
                      {talk.role} • <strong className="text-gold">{talk.organization}</strong>
                    </p>
                  </div>
                </div>

                {/* Session Title */}
                <h2 className="mt-6 text-xl font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors duration-300 font-display">
                  {talk.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-gold/70 font-display">
                  {talk.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {talk.abstract}
                </p>

                {/* Location & Time */}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-gold">⏰</span>
                    <span>{talk.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold">📍</span>
                    <span>{talk.venue}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gold/20 pt-6">
                <a
                  href={talk.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-gold bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[2px] text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(225,157,0,0.4)]"
                >
                  Reserve Seat
                </a>
                <button
                  onClick={() => setSelectedTalk(talk)}
                  className="rounded-full border border-gold/40 bg-gold/5 px-6 py-3 text-xs font-semibold uppercase tracking-[2px] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/15"
                >
                  Session Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Interactive Agenda Matrix */}
      <section className="mx-auto max-w-[1000px] px-[clamp(16px,4vw,40px)] py-16">
        <h2 className="text-center text-3xl font-bold uppercase tracking-tight font-display text-gold-gradient">
          Master Agenda & Session Schedule
        </h2>

        {/* Day Selector */}
        <div className="mt-8 flex justify-center gap-3">
          {agendaData.map((ag, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[2px] transition-all duration-300 ${
                activeDay === i
                  ? 'bg-gold text-black shadow-[0_0_15px_rgba(225,157,0,0.4)]'
                  : 'border border-gold/30 bg-black/40 text-gold/80 hover:text-gold'
              }`}
            >
              {ag.day}
            </button>
          ))}
        </div>

        {/* Timetable List */}
        <div className="mt-8 rounded-2xl border border-gold/30 bg-black/40 p-6 backdrop-blur-md">
          <div className="flex flex-col gap-4">
            {agendaData[activeDay].sessions.map((sess, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-xl border border-gold/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-gold min-w-[90px]">{sess.time}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">{sess.title}</h4>
                    <p className="text-xs text-white/50">{sess.speaker}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-gold/80 bg-gold/10 px-3 py-1 rounded-full border border-gold/20 self-start sm:self-center">
                  📍 {sess.venue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talk Detail Modal */}
      {selectedTalk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-gold/40 bg-[#0a0a0a] p-6 text-gold shadow-[0_0_50px_rgba(225,157,0,0.2)] md:p-8">
            <button
              onClick={() => setSelectedTalk(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-lg text-gold hover:bg-gold hover:text-black"
            >
              ✕
            </button>

            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
              {selectedTalk.badge}
            </span>

            <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white font-display">
              {selectedTalk.title}
            </h3>

            <div className="mt-4 flex items-center gap-3 border-y border-gold/20 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold/20 font-bold text-gold font-display">
                {selectedTalk.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-bold text-gold uppercase tracking-wider">{selectedTalk.speaker}</p>
                <p className="text-xs text-white/70">{selectedTalk.role} • {selectedTalk.organization}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {selectedTalk.abstract}
            </p>

            {/* Key Takeaways */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-gold font-display">
                Key Session Takeaways
              </h4>
              <ul className="mt-3 flex flex-col gap-2 text-xs text-white/70 list-disc pl-5">
                {selectedTalk.takeaways.map((take, idx) => (
                  <li key={idx}>{take}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                onClick={() => setSelectedTalk(null)}
                className="px-6 py-2.5 text-xs uppercase tracking-wider text-white/60 hover:text-white"
              >
                Close
              </button>
              <a
                href={selectedTalk.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold bg-gold px-8 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-black hover:bg-transparent hover:text-gold"
              >
                Reserve Seat Now
              </a>
            </div>
          </div>
        </div>
      )}

      {!embedded && <Footer />}
    </div>
  )
}

export default Talks

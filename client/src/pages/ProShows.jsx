import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

const proShowsData = [
  {
    id: 'neon-pulse',
    title: 'Neon Pulse: EDM & DJ Night',
    subtitle: 'High Voltage Electronic Beats & Laser Spectacle',
    category: 'edm',
    date: '18 September 2026',
    time: '07:00 PM onwards',
    venue: 'Main Open Air Arena',
    entry: 'Pass Required',
    badge: 'Day 1 Headliner',
    performers: 'Featured DJ Duo • Visual Synthesizers • Bass Collective',
    description:
      'Immerse yourself in a high-octane electronic music showcase featuring state-of-the-art 3D laser visualizers, synchronized pyro effects, and non-stop energetic beats from acclaimed national DJs.',
    schedule: [
      { time: '06:30 PM', activity: 'Gates Open & Opening DJ Warmup' },
      { time: '07:30 PM', activity: 'Regional Bass Collective Live' },
      { time: '08:45 PM', activity: 'Headliner DJ Duo Mainstage Set' },
      { time: '10:15 PM', activity: 'Laser & Pyro Afterglow' },
    ],
    rules: [
      'Valid student ID and registered Drishti ProShow pass are mandatory at entry.',
      'Gates close strictly at 08:30 PM. No re-entry permitted.',
      'Professional audio/video cameras and outside food/beverages are prohibited.',
      'Follow security instructions for a safe and exhilarating concert experience.',
    ],
    registerUrl: 'https://snaptiqz.com/event/proshow-neon-pulse',
  },
  {
    id: 'acoustic-echoes',
    title: 'Acoustic Echoes: Live Concert',
    subtitle: 'Soulful Rock Fusion & Live Band Performance',
    category: 'live-band',
    date: '19 September 2026',
    time: '06:30 PM onwards',
    venue: 'Grand Amphitheatre',
    entry: 'Pass Required',
    badge: 'Day 2 Headliner',
    performers: 'Indie Rock Ensemble • Fusion Violinist • Brass Section',
    description:
      'Experience an unforgettable evening of live instrumental mastery, electrifying guitar solos, and soulful vocal performances spanning indie rock, fusion, and original compositions.',
    schedule: [
      { time: '06:00 PM', activity: 'Seating & Acoustic Prelude' },
      { time: '06:45 PM', activity: 'Opening Act: Campus Battle of the Bands Winner' },
      { time: '07:45 PM', activity: 'Indie Rock Ensemble Live Concert' },
      { time: '09:45 PM', activity: 'Encore & Jam Session' },
    ],
    rules: [
      'Seating is on a first-come, first-served basis for pass holders.',
      'Valid physical or digital pass required for entry.',
      'Emergency exit corridors must be kept clear at all times.',
    ],
    registerUrl: 'https://snaptiqz.com/event/proshow-acoustic-echoes',
  },
  {
    id: 'grand-finale',
    title: 'Grand Finale: Star Performance & Afterparty',
    subtitle: 'Celebrity Concert & Closing Extravaganza',
    category: 'celebrity',
    date: '20 September 2026',
    time: '07:00 PM onwards',
    venue: 'Main Open Air Arena',
    entry: 'VIP / General Pass',
    badge: 'Culminating Night',
    performers: 'Celebrity Playback Singer • Symphony Orchestra • Light Show',
    description:
      'The crown jewel of Drishti 2026! A breathtaking celebrity concert featuring chart-topping anthems, live orchestral accompaniment, and a spectacular fireworks display to close the fest.',
    schedule: [
      { time: '06:30 PM', activity: 'VIP & General Gate Check-in' },
      { time: '07:15 PM', activity: 'Drishti 2026 Awards & Ceremony' },
      { time: '08:00 PM', activity: 'Celebrity Concert Main Performance' },
      { time: '10:30 PM', activity: 'Grand Fireworks & Fest Conclusion' },
    ],
    rules: [
      'VIP badge holders get priority front-row enclosure access.',
      'Strict security screening at all entry checkpoints.',
      'Lost passes will not be reissued under any circumstances.',
    ],
    registerUrl: 'https://snaptiqz.com/event/proshow-grand-finale',
  },
  {
    id: 'laugh-line',
    title: 'The Laugh Line: Comedy Special',
    subtitle: 'Stand-Up Comedy & Interactive Roasts',
    category: 'comedy',
    date: '19 September 2026',
    time: '04:00 PM - 05:30 PM',
    venue: 'Main Auditorium',
    entry: 'Free for Registered Delegates',
    badge: 'Special Evening',
    performers: 'Top National Stand-Up Comedians',
    description:
      'Take a break from technical exhibits and immerse yourself in 90 minutes of pure laughter with top-tier stand-up comedians featuring hilarious college life humor and observational comedy.',
    schedule: [
      { time: '03:30 PM', activity: 'Auditorium Doors Open' },
      { time: '04:00 PM', activity: 'Opening Act Comedy Set' },
      { time: '04:30 PM', activity: 'Headliner Stand-Up Special' },
      { time: '05:30 PM', activity: 'Meet & Greet with Comedians' },
    ],
    rules: [
      'Auditorium seating capacity is limited to 1,200 attendees.',
      'Please switch mobile phones to silent during the performance.',
      'No video recording during the stand-up set.',
    ],
    registerUrl: 'https://snaptiqz.com/event/proshow-laugh-line',
  },
]

const stats = [
  { value: '3', label: 'Epic Nights' },
  { value: '10,000+', label: 'Expected Crowd' },
  { value: '4', label: 'Major Shows' },
  { value: '100%', label: 'Unforgettable' },
]

const faqs = [
  {
    q: 'How do I obtain entry passes for the ProShows?',
    a: 'ProShow passes can be booked online via the official registration link or collected from the Drishti Registration Desk on campus. Passes are linked to your Drishti ID.',
  },
  {
    q: 'Can non-KSIT students attend the ProShows?',
    a: 'Yes! ProShows are open to students from all colleges with a valid college ID card and an official Drishti ProShow pass.',
  },
  {
    q: 'Are there VIP / Front-Row access options?',
    a: 'Limited VIP passes are available for registered team participants and competition winners. Check the registration portal for upgrade availability.',
  },
  {
    q: 'What items are prohibited inside the concert venue?',
    a: 'Prohibited items include professional cameras, tripods, glass bottles, food items, sharp objects, and laser pointers. Standard bags are subject to security search.',
  },
]

function ProShows({ embedded = false }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedShow, setSelectedShow] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

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

  const filteredShows =
    activeCategory === 'all'
      ? proShowsData
      : proShowsData.filter((show) => show.category === activeCategory)

  return (
    <div className={`relative min-h-svh w-full text-gold ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="proshows" />}

      {/* Hero Header */}
      <header className="px-[clamp(16px,4vw,40px)] pb-6 pt-[clamp(40px,6vw,64px)] text-center">
        <p ref={eyebrowRef} className="text-[11px] uppercase tracking-[6px] text-gold/60 font-display">
          Drishti 2026 Nightlife
        </p>
        <h1
          ref={h1Ref}
          className="mt-3 text-[clamp(40px,8vw,90px)] font-bold uppercase leading-[0.95] tracking-tight font-display drop-shadow-[0_0_30px_rgba(225,157,0,0.35)]"
        >
          Pro Shows
        </h1>
        <p className="mx-auto mt-4 max-w-[640px] text-[clamp(14px,1.6vw,17px)] leading-relaxed text-white/70">
          Electrifying music, stellar live concerts, comedy specials, and unforgettable nights under the stars. Experience the ultimate spectacle of Drishti 2026.
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
            { id: 'all', label: 'All Shows' },
            { id: 'edm', label: 'EDM & DJ Night' },
            { id: 'live-band', label: 'Live Concert' },
            { id: 'celebrity', label: 'Celebrity Night' },
            { id: 'comedy', label: 'Comedy Special' },
          ].map((tab) => {
            const isSelected = activeCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[2px] transition-all duration-300 ${
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

      {/* Pro Shows Grid */}
      <main className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] py-12">
        <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
          {filteredShows.map((show) => (
            <article
              key={show.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 bg-black/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:bg-black/70 hover:shadow-[0_0_30px_rgba(225,157,0,0.2)] md:p-8"
            >
              {/* Golden Corner Markers */}
              <div className="absolute -top-1 -left-1 h-3.5 w-3.5 border-l-2 border-t-2 border-gold" />
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 border-r-2 border-t-2 border-gold" />
              <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 border-l-2 border-b-2 border-gold" />
              <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-r-2 border-b-2 border-gold" />

              <div>
                {/* Header Badge & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-4">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
                    {show.badge}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    {show.date}
                  </span>
                </div>

                {/* Stylized Visual Stage Display Box */}
                <div className="relative mt-6 flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-[#1a1405] via-[#0a0a0a] to-[#050505] p-6 text-center shadow-inner">
                  {/* Decorative ambient glow */}
                  <div className="absolute -inset-10 bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/20" />
                  
                  {/* Soundwave/Waveform Graphic SVG */}
                  <div className="relative z-10 flex items-center justify-center gap-1.5 opacity-80 transition-transform duration-300 group-hover:scale-105">
                    {[40, 70, 30, 90, 50, 85, 60, 95, 45, 75, 35].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 rounded-full bg-gold-gradient"
                        style={{ height: `${h}%`, minHeight: '12px' }}
                      />
                    ))}
                  </div>

                  <span className="relative z-10 mt-4 text-xs font-semibold uppercase tracking-[3px] text-gold/90 font-display">
                    {show.performers}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="mt-6 text-2xl font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors duration-300 font-display">
                  {show.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-gold/70 font-display">
                  {show.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {show.description}
                </p>

                {/* Meta details */}
                <div className="mt-6 flex flex-wrap gap-y-2 gap-x-6 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    <span>{show.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    <span>{show.venue}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gold/20 pt-6">
                <a
                  href={show.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-gold bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[2px] text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(225,157,0,0.4)]"
                >
                  Book Pass
                </a>
                <button
                  onClick={() => setSelectedShow(show)}
                  className="rounded-full border border-gold/40 bg-gold/5 px-6 py-3 text-xs font-semibold uppercase tracking-[2px] text-gold transition-all duration-300 hover:border-gold hover:bg-gold/15"
                >
                  Lineup & Info
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FAQ Section */}
      <section className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)] py-16">
        <h2 className="text-center text-3xl font-bold uppercase tracking-tight font-display text-gold-gradient">
          ProShow Guidelines & FAQ
        </h2>
        <div className="mt-10 flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gold/20 bg-black/40 backdrop-blur-md transition-colors duration-300 hover:border-gold/40"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-sm font-semibold uppercase tracking-wider text-white font-display">
                  {faq.q}
                </span>
                <span className="ml-4 text-xl text-gold">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <div className="border-t border-gold/10 px-6 pb-6 pt-2 text-sm leading-relaxed text-white/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-gold/40 bg-[#0a0a0a] p-6 text-gold shadow-[0_0_50px_rgba(225,157,0,0.2)] md:p-8">
            <button
              onClick={() => setSelectedShow(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-lg text-gold hover:bg-gold hover:text-black"
            >
              ✕
            </button>

            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
              {selectedShow.badge}
            </span>

            <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white font-display">
              {selectedShow.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wider text-gold/80 font-display">
              {selectedShow.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/70 border-y border-gold/20 py-3">
              <div><strong className="text-gold">Date:</strong> {selectedShow.date}</div>
              <div><strong className="text-gold">Time:</strong> {selectedShow.time}</div>
              <div><strong className="text-gold">Venue:</strong> {selectedShow.venue}</div>
            </div>

            {/* Schedule timeline */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-gold font-display">
                Show Schedule & Timeline
              </h4>
              <div className="mt-3 flex flex-col gap-2">
                {selectedShow.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-lg bg-white/5 p-2.5 text-xs text-white/80">
                    <span className="font-mono text-gold">{item.time}</span>
                    <span className="h-1 w-1 rounded-full bg-gold/50" />
                    <span>{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Entry Rules */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-gold font-display">
                Entry Rules & Guidelines
              </h4>
              <ul className="mt-3 flex flex-col gap-2 text-xs text-white/60 list-disc pl-5">
                {selectedShow.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                onClick={() => setSelectedShow(null)}
                className="px-6 py-2.5 text-xs uppercase tracking-wider text-white/60 hover:text-white"
              >
                Close
              </button>
              <a
                href={selectedShow.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold bg-gold px-8 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-black hover:bg-transparent hover:text-gold"
              >
                Get Pass
              </a>
            </div>
          </div>
        </div>
      )}

      {!embedded && <Footer />}
    </div>
  )
}

export default ProShows

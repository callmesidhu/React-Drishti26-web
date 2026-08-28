import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

const exhibitionData = [
  {
    id: 'robo-dome',
    title: 'RoboDome: Autonomous & Humanoid Showcase',
    category: 'robotics',
    stall: 'Hangar A • Stall 01-04',
    status: 'Live Demos',
    tag: 'Robotics & AI',
    description:
      'Experience state-of-the-art autonomous quadrupeds, bipedal humanoid prototypes, and AI-driven drone swarms performing real-time obstacle navigation and collaborative tasks.',
    specs: ['ROS2 & Gazebo', 'Computer Vision', 'LiDAR & SLAM', 'Neural Motion Control'],
    demos: [
      { time: '10:30 AM', title: 'Humanoid Bipedal Balance & Terrain Traversal' },
      { time: '02:00 PM', title: 'Autonomous Drone Swarm Synchronization' },
      { time: '04:30 PM', title: 'Quadruped Search & Rescue Simulation' },
    ],
    highlights: 'Interactive control ring available for visitors during demo intervals.',
    registerUrl: 'https://snaptiqz.com/event/exhibition-robodome',
  },
  {
    id: 'ev-hyper-expo',
    title: 'HyperDrive: Next-Gen Electric & Superbike Expo',
    category: 'auto',
    stall: 'Outdoor Arena • Sector B',
    status: 'Interactive Experience',
    tag: 'Automotive & EV',
    description:
      'Witness custom-built student formula electric racecars, solar-powered endurance prototypes, and high-performance electric superbike concepts designed by top engineering labs.',
    specs: ['750V Battery Architecture', 'Carbon Fiber Monocoque', 'Regenerative Telemetry', '0-100 km/h in 2.8s'],
    demos: [
      { time: '11:15 AM', title: 'Formula Student EV Acceleration Trial' },
      { time: '03:15 PM', title: 'Telemetry & BMS Safety Deep-Dive' },
    ],
    highlights: 'VR Simulator cockpit open for visitors to test track lap times.',
    registerUrl: 'https://snaptiqz.com/event/exhibition-hyperdrive',
  },
  {
    id: 'vr-meta-lab',
    title: 'MetaVerse: Spatial Computing & Haptics Lab',
    category: 'vr',
    stall: 'Tech Pavilion 2 • Room 204',
    status: 'Hands-on Booth',
    tag: 'VR & Immersive Tech',
    description:
      'Step inside multi-sensory virtual reality environments equipped with full-body haptic feedback suits, eye-tracking headsets, and real-time spatial audio rendering.',
    specs: ['Meta Quest Pro & Apple Vision', 'Custom Haptic Vest', 'Unreal Engine 5.4', 'Spatial Audio Array'],
    demos: [
      { time: 'All Day', title: 'Continuous Walk-in VR Simulations & Haptic Demos' },
    ],
    highlights: 'Try surgical training simulations and virtual space walk experiences.',
    registerUrl: 'https://snaptiqz.com/event/exhibition-metaverse',
  },
  {
    id: 'green-horizon',
    title: 'Green Horizon: Clean Energy & Bio-Tech Innovations',
    category: 'green-tech',
    stall: 'Hangar B • Stall 12-15',
    status: 'R&D Showcase',
    tag: 'Sustainability',
    description:
      'Explore groundbreaking research in green hydrogen fuel cells, algae-based bio-reactors, smart microgrids, and biodegradable composite materials developed for industry 4.0.',
    specs: ['PEM Fuel Cells', 'Smart Grid IoT Sensors', 'Bio-Polymer Matrices', 'Carbon Capture Cell'],
    demos: [
      { time: '11:00 AM', title: 'Hydrogen Electrolysis & Power Generation Trial' },
      { time: '03:30 PM', title: 'Smart Grid Micro-Grid Load Balancing' },
    ],
    highlights: 'Live working model of zero-emission college campus microgrid.',
    registerUrl: 'https://snaptiqz.com/event/exhibition-green-horizon',
  },
  {
    id: 'project-expo-2026',
    title: 'National Student Project Expo 2026',
    category: 'projects',
    stall: 'Central Exhibition Hall',
    status: '50+ Student Stalls',
    tag: 'Project Expo',
    description:
      'Over 50 innovative student-built hardware and software projects competing for the National Engineering Excellence Award across AI, IoT, Biomedical, and Aerospace domains.',
    specs: ['AI Medical Diagnostics', 'Smart Agriculture IoT', 'CubeSat Avionics', 'Sub-surface Sonar'],
    demos: [
      { time: '10:00 AM - 05:00 PM', title: 'Live Judging & Continuous Visitor Interactive Demonstrations' },
    ],
    highlights: 'Vote for your favorite project in the People’s Choice Innovation Award.',
    registerUrl: 'https://snaptiqz.com/event/exhibition-project-expo',
  },
]

const stats = [
  { value: '25+', label: 'Stalls & Pavilions' },
  { value: '50+', label: 'Live Projects' },
  { value: '10+', label: 'Interactive Demos' },
  { value: '3 Days', label: 'Continuous Access' },
]

function Exhibitions({ embedded = false }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExhibit, setSelectedExhibit] = useState(null)

  const h1Ref = useRef(null)
  const eyebrowRef = useRef(null)
  const subtitleRef = useRef(null)
  const statsRowRef = useRef(null)
  const searchRef = useRef(null)
  const filterRef = useRef(null)
  const gridRef = useRef(null)
  const infoRef = useRef(null)
  const statValueRefs = useRef([])
  const modalRef = useRef(null)

  useEffect(() => {
    applyLetterGradient(h1Ref.current)
    applyLetterGradient(eyebrowRef.current)
    statValueRefs.current.forEach(applyLetterGradient)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(h1Ref.current, { y: 60, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 })
      gsap.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.3 })
      gsap.fromTo(statsRowRef.current, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 })
      gsap.fromTo(searchRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.6 })
      if (filterRef.current) {
        gsap.fromTo(filterRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.7 })
      }
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 0.8 })
      if (infoRef.current) {
        gsap.fromTo(infoRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 85%' },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    )
  }, [activeCategory, searchQuery])

  useEffect(() => {
    if (selectedExhibit && modalRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' })
    }
  }, [selectedExhibit])

  const filteredExhibits = exhibitionData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className={`relative min-h-svh w-full text-gold ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="exhibitions" />}

      {/* Hero Header */}
      <header className="px-[clamp(16px,4vw,40px)] pb-6 pt-[clamp(40px,6vw,64px)] text-center">
        <p ref={eyebrowRef} className="text-[11px] uppercase tracking-[6px] text-gold/60 font-display" style={{ opacity: 0 }}>
          Drishti 2026 Innovation Hub
        </p>
        <h1
          ref={h1Ref}
          className="mt-3 text-[clamp(40px,8vw,90px)] font-bold uppercase leading-[0.95] tracking-tight font-display drop-shadow-[0_0_30px_rgba(225,157,0,0.35)]"
          style={{ opacity: 0 }}
        >
          Exhibitions
        </h1>
        <p ref={subtitleRef} className="mx-auto mt-4 max-w-[640px] text-[clamp(14px,1.6vw,17px)] leading-relaxed text-white/70" style={{ opacity: 0 }}>
          Witness tomorrow's technologies today. Explore bipedal robotics, formula electric racecars, spatial computing labs, and groundbreaking student innovations.
        </p>

        {/* Stats Row */}
        <div ref={statsRowRef} className="mx-auto mt-10 grid max-w-[850px] grid-cols-2 gap-4 rounded-2xl border border-gold/20 bg-black/40 p-6 backdrop-blur-md sm:grid-cols-4" style={{ opacity: 0 }}>
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

      {/* Filter Tabs & Search Bar */}
      <section className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] pt-6">
        <div className="flex flex-col items-center gap-6">
          {/* Search Box */}
          <div ref={searchRef} className="relative w-full max-w-[500px]" style={{ opacity: 0 }}>
            <input
              type="text"
              placeholder="Search pavilions, tech specs, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gold/30 bg-black/60 px-6 py-3 pl-12 text-sm text-white placeholder-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gold/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Tabs */}
          <div ref={filterRef} className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'all', label: 'All Pavilions' },
              { id: 'robotics', label: 'Robotics & AI' },
              { id: 'auto', label: 'Automotive & EV' },
              { id: 'vr', label: 'VR & Haptics' },
              { id: 'green-tech', label: 'Clean Tech' },
              { id: 'projects', label: 'Project Expo' },
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
        </div>
      </section>

      {/* Exhibitions Grid */}
      <main className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)] py-12">
        {filteredExhibits.length === 0 ? (
          <div className="py-16 text-center text-white/50">
            No pavilions match your filter criteria. Try adjusting your search query.
          </div>
        ) : (
          <div ref={gridRef} className="grid gap-8 md:grid-cols-2">
            {filteredExhibits.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/30 bg-black/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:bg-black/70 hover:shadow-[0_0_30px_rgba(225,157,0,0.2)] md:p-8"
              >
                {/* Golden Corner Markers */}
                <div className="absolute -top-1 -left-1 h-3.5 w-3.5 border-l-2 border-t-2 border-gold" />
                <div className="absolute -top-1 -right-1 h-3.5 w-3.5 border-r-2 border-t-2 border-gold" />
                <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 border-l-2 border-b-2 border-gold" />
                <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 border-r-2 border-b-2 border-gold" />

                <div>
                  {/* Top Bar: Tag & Stall location */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/20 pb-4">
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
                      {item.tag}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white/50 font-mono">
                      📍 {item.stall}
                    </span>
                  </div>

                  {/* Title & Status */}
                  <h2 className="mt-6 text-2xl font-bold uppercase tracking-tight text-white group-hover:text-gold transition-colors duration-300 font-display">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-wider text-gold/70 font-display">
                    Status: <span className="text-white">{item.status}</span>
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>

                  {/* Tech Specs Badges */}
                  <div className="mt-6">
                    <span className="text-[10px] uppercase tracking-[2px] text-gold/70 font-display block mb-2">
                      Key Technologies & Specs
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.specs.map((spec, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gold/20 pt-6">
                  <button
                    onClick={() => setSelectedExhibit(item)}
                    className="flex-1 rounded-full border border-gold bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[2px] text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(225,157,0,0.4)]"
                  >
                    Explore Pavilion & Demos
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Visitor Info & Venue Map Section */}
      <section ref={infoRef} className="mx-auto max-w-[1000px] px-[clamp(16px,4vw,40px)] py-16" style={{ opacity: 0 }}>
        <div className="rounded-2xl border border-gold/30 bg-black/40 p-8 backdrop-blur-md text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-gold-gradient font-display">
            Exhibition Floorplan & Entry Guidelines
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Exhibitions are open daily from 09:30 AM to 05:30 PM. All registered Drishti delegates have free access to all pavilions. Safety gear will be provided at high-voltage and VR demonstration zones.
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-gold/20 bg-white/5 p-4">
              <span className="text-lg text-gold">🏛️</span>
              <h4 className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold font-display">Hangar A & B</h4>
              <p className="mt-1 text-xs text-white/50">Robotics, Heavy Hardware & Clean Tech Pavilions.</p>
            </div>
            <div className="rounded-xl border border-gold/20 bg-white/5 p-4">
              <span className="text-lg text-gold">🏎️</span>
              <h4 className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold font-display">Outdoor Arena</h4>
              <p className="mt-1 text-xs text-white/50">Formula EV Racecars & High-Speed Demos.</p>
            </div>
            <div className="rounded-xl border border-gold/20 bg-white/5 p-4">
              <span className="text-lg text-gold">🥽</span>
              <h4 className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold font-display">Tech Pavilion 2</h4>
              <p className="mt-1 text-xs text-white/50">VR Spatial Computing & Immersive Haptic Labs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibit Detail Modal */}
      {selectedExhibit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div ref={modalRef} className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-gold/40 bg-[#0a0a0a] p-6 text-gold shadow-[0_0_50px_rgba(225,157,0,0.2)] md:p-8" style={{ opacity: 0 }}>
            <button
              onClick={() => setSelectedExhibit(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-lg text-gold hover:bg-gold hover:text-black"
            >
              ✕
            </button>

            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-gold font-display">
              {selectedExhibit.tag}
            </span>

            <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-white font-display">
              {selectedExhibit.title}
            </h3>

            <p className="mt-2 text-xs uppercase tracking-wider text-gold font-mono">
              Location: {selectedExhibit.stall}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {selectedExhibit.description}
            </p>

            {/* Live Demo Timings */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-gold font-display">
                Live Demonstration Schedule
              </h4>
              <div className="mt-3 flex flex-col gap-2">
                {selectedExhibit.demos.map((demo, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-lg bg-white/5 p-3 text-xs text-white/80">
                    <span className="font-mono text-gold">{demo.time}</span>
                    <span className="h-1 w-1 rounded-full bg-gold/50" />
                    <span>{demo.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 rounded-xl border border-gold/20 bg-gold/5 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gold font-display block">
                Visitor Interactive Feature
              </span>
              <p className="mt-1 text-xs text-white/70">{selectedExhibit.highlights}</p>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <button
                onClick={() => setSelectedExhibit(null)}
                className="rounded-full border border-gold bg-gold px-8 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-black hover:bg-transparent hover:text-gold"
              >
                Close Pavilion View
              </button>
            </div>
          </div>
        </div>
      )}

      {!embedded && <Footer />}
    </div>
  )
}

export default Exhibitions

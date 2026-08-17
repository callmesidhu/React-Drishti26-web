import Navbar from '../components/Navbar.jsx'

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

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(45% 40% at 20% 10%, rgba(212, 175, 55, 0.14), transparent 70%),
            radial-gradient(50% 50% at 85% 35%, rgba(212, 175, 55, 0.10), transparent 75%),
            radial-gradient(60% 55% at 50% 90%, rgba(212, 175, 55, 0.08), transparent 80%),
            radial-gradient(35% 30% at 50% 45%, rgba(255, 215, 0, 0.05), transparent 60%)
          `,
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="brutalist-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-gold" />
            <path d="M 57 60 H 63 M 60 57 V 63" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gold" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#brutalist-grid)" />
      </svg>

      <div className="absolute inset-0 opacity-25">
        <div className="absolute -top-40 left-1/4 h-[800px] w-[1px] rotate-[35deg] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        <div className="absolute top-1/3 -right-20 h-[1000px] w-[1px] -rotate-[35deg] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="absolute top-6 left-6 h-8 w-8 border-l-2 border-t-2 border-gold/40" />
      <div className="absolute top-6 right-6 h-8 w-8 border-r-2 border-t-2 border-gold/40" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-l-2 border-b-2 border-gold/40" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-r-2 border-b-2 border-gold/40" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 0 180px 60px rgba(0, 0, 0, 0.85)' }}
      />
    </div>
  )
}

function Daksha() {
  return (
    <div className="relative min-h-svh w-full text-gold">
      <Backdrop />

      <Navbar />

      <header className="px-[clamp(16px,4vw,40px)] pb-8 pt-[clamp(40px,6vw,64px)] text-center">
        <h1 className="mt-3 text-[clamp(44px,8vw,80px)] font-bold uppercase leading-[0.95] tracking-tight text-gold font-display [text-shadow:0_0_20px_rgba(225,157,0,0.45),0_0_60px_rgba(225,157,0,0.2)]">
          Daksha
        </h1>
        <p className="text-[30px] uppercase tracking-[4px] text-gold/60">Events</p>
      </header>

      <main className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(56px,8vw,88px)] px-[clamp(16px,4vw,40px)] pb-24">
        {events.map((event) => (
          <section
            key={event.title}
            className="flex flex-col items-center border-t border-gold/30 pt-[clamp(32px,5vw,48px)] text-center md:grid md:grid-cols-2 md:items-center md:gap-x-14 md:gap-y-6 md:text-left"
          >
            <div className="order-1 flex flex-col items-center md:col-start-1 md:row-start-1 md:items-start">
              <p className="text-[11px] uppercase tracking-[4px] text-gold/60">{event.guidelines}</p>
              <h2 className="mt-3 text-[clamp(32px,5vw,52px)] font-bold uppercase leading-[0.98] tracking-tight text-gold font-display [text-shadow:0_0_16px_rgba(225,157,0,0.4)]">
                {event.title}
              </h2>

              <ul className="mt-6 flex flex-col gap-4">
                {event.details.map((line, i) => (
                  <li key={i} className="leading-[1.7] text-gold/80">
                    {formatDetail(line)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative order-2 mt-8 w-full border border-gold/40 bg-black/40 p-2 backdrop-blur-sm md:order-none md:mt-0 md:col-start-2 md:row-start-1 md:row-span-2">
              <div className="absolute -top-1 -left-1 h-3 w-3 border-l-2 border-t-2 border-gold" />
              <div className="absolute -top-1 -right-1 h-3 w-3 border-r-2 border-t-2 border-gold" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 border-l-2 border-b-2 border-gold" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 border-r-2 border-b-2 border-gold" />

              <img className="block aspect-[4/5] w-full object-cover" src={event.image} alt={event.alt} />
            </div>

            <div className="order-3 mt-8 md:mt-0 md:col-start-1 md:row-start-2">
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-gold bg-gold/5 px-10 py-3 text-xs uppercase tracking-[3px] text-gold transition-all duration-200 hover:bg-gold hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                Register
              </a>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default Daksha
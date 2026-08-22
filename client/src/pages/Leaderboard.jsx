import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'

gsap.registerPlugin(ScrollTrigger)

const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE}/api/ambassador/leaderboard/`)
  if (!res.ok) {
    throw new Error(`Leaderboard request failed with status ${res.status}`)
  }
  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Unexpected leaderboard response format')
  }
  return data
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)

  const loadEntries = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchLeaderboard()
      setEntries(data)
    } catch {
      setError('Unable to load standings right now')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEntries()
  }, [loadEntries])

  useEffect(() => {
    const el = tableRef.current
    if (!el || isLoading || error || entries.length === 0) return

    const ctx = gsap.context(() => {
      const rows = el.querySelectorAll('.lb-row')
      gsap.set(rows, { x: () => window.innerWidth })

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(rows, {
            x: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.03,
            overwrite: true,
          })
        },
      })
    }, tableRef)

    return () => ctx.revert()
  }, [entries, isLoading, error])

  return (
    <div className="relative min-h-svh w-full overflow-hidden">
      <Backdrop />
      <Navbar />

      <section className="mx-auto flex w-full max-w-[1180px] flex-col px-[clamp(16px,4vw,40px)] pb-[clamp(48px,8vw,96px)] pt-[clamp(24px,4vw,48px)]">
        <header className="text-center">
          <p className="text-[11px] uppercase tracking-[5px] text-gold/60">Drishti 2026</p>
          <h1 className="mt-3 text-[clamp(44px,8vw,110px)] font-bold uppercase leading-[0.95] tracking-tight text-gold font-display [text-shadow:0_0_20px_rgba(225,157,0,0.45),0_0_60px_rgba(225,157,0,0.2)]">
            <span className="relative inline-block">
              Leaderboard
              <span
                className="absolute -top-1 left-[30%] text-lg md:-top-2 md:left-[30%] md:text-3xl"
                style={{ color: '#e19d00', filter: 'blur(0.5px)' }}
              >
                ✦
              </span>
            </span>
          </h1>
          <p className="mt-4 text-[clamp(11px,1.4vw,14px)] uppercase tracking-[4px] text-gold/50">
            Standings across all events
          </p>
        </header>

        <div
          ref={tableRef}
          className="relative mt-[clamp(32px,5vw,56px)] border border-gold/40 bg-black/40 p-[clamp(8px,1.5vw,20px)] backdrop-blur-sm"
        >
          <div className="absolute -top-1 -left-1 h-3 w-3 border-l-2 border-t-2 border-gold" />
          <div className="absolute -top-1 -right-1 h-3 w-3 border-r-2 border-t-2 border-gold" />
          <div className="absolute -bottom-1 -left-1 h-3 w-3 border-l-2 border-b-2 border-gold" />
          <div className="absolute -bottom-1 -right-1 h-3 w-3 border-r-2 border-b-2 border-gold" />

          {!isLoading && !error && entries.length > 0 && (
            <>
              <div
                className="lb-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-[clamp(12px,2vw,24px)] border-b border-gold/30 px-[clamp(10px,2vw,24px)] py-[clamp(10px,1.5vw,18px)] sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <span className="w-[clamp(28px,4vw,48px)] text-left text-[clamp(11px,1.4vw,13px)] font-semibold uppercase tracking-[3px] text-white/40">
                  #
                </span>
                <span className="min-w-0 text-left text-[clamp(11px,1.4vw,13px)] font-semibold uppercase tracking-[3px] text-white/40">
                  Name
                </span>
                <span className="hidden min-w-0 text-left text-[clamp(11px,1.4vw,13px)] font-semibold uppercase tracking-[3px] text-white/40 sm:block">
                  College
                </span>
                <span className="text-right text-[clamp(11px,1.4vw,13px)] font-semibold uppercase tracking-[3px] text-white/40">
                  Points
                </span>
              </div>

              {entries.map((entry, i) => (
                <div
                  key={entry.rank}
                  className={`lb-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-[clamp(12px,2vw,24px)] px-[clamp(10px,2vw,24px)] py-[clamp(10px,1.5vw,18px)] transition-colors duration-200 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] ${
                    i === 0 ? 'bg-gold/10' : i % 2 === 1 ? 'bg-white/[0.02]' : ''
                  } ${i !== entries.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.04]`}
                >
                  <span
                    className={`w-[clamp(28px,4vw,48px)] text-left text-[clamp(14px,2vw,18px)] font-bold tabular-nums ${
                      i === 0 ? 'text-gold' : 'text-gold/50'
                    }`}
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {String(entry.rank).padStart(2, '0')}
                  </span>
                  <span
                    className={`truncate text-left text-[clamp(13px,1.8vw,16px)] ${
                      i === 0 ? 'font-semibold text-gold' : 'text-white/90'
                    }`}
                  >
                    {entry.name}
                  </span>
                  <span className="hidden truncate text-left text-[clamp(12px,1.6vw,15px)] text-white/50 sm:block">
                    {entry.college}
                  </span>
                  <span
                    className={`text-right text-[clamp(13px,1.8vw,16px)] tabular-nums ${
                      i === 0 ? 'font-bold text-gold' : 'font-medium text-gold/80'
                    }`}
                  >
                    {(entry.points ?? 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </>
          )}

          {isLoading && (
            <div className="px-[clamp(10px,2vw,24px)] py-[clamp(32px,6vw,56px)] text-center text-[clamp(11px,1.4vw,14px)] uppercase tracking-[4px] text-gold/50">
              Loading standings…
            </div>
          )}

          {!isLoading && error && (
            <div className="px-[clamp(10px,2vw,24px)] py-[clamp(32px,6vw,56px)] text-center">
              <p className="text-[clamp(11px,1.4vw,14px)] uppercase tracking-[4px] text-gold/60">{error}</p>
              <button
                type="button"
                onClick={loadEntries}
                className="mt-6 border border-gold/60 px-7 py-2.5 text-[11px] uppercase tracking-[3px] text-gold transition-colors duration-200 hover:bg-gold hover:text-black"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && entries.length === 0 && (
            <div className="px-[clamp(10px,2vw,24px)] py-[clamp(32px,6vw,56px)] text-center text-[clamp(11px,1.4vw,14px)] uppercase tracking-[4px] text-gold/50">
              Standings coming soon
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Leaderboard

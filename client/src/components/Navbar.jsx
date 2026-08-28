import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const links = [
  { label: 'Workshops', to: '/workshops' },
  { label: 'Competitions', to: '/competitions', scrollTo: 'competitions-section' },
  { label: 'Pro Shows', to: '/proshows' },
  { label: 'Exhibitions', to: '/exhibitions' },
  { label: 'Talks', to: '/talks' },
  { label: 'Daksha', to: '/daksha' },
  { label: 'Team', to: '/team', scrollTo: 'team-section' },
  { label: 'About', to: '/about', scrollTo: 'about-section' },
]

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const desktopLinksRef = useRef(null)
  const mobileOverlayRef = useRef(null)
  const mobileLinksRef = useRef([])
  const hamburgerRef = useRef(null)
  const barsRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    tl.fromTo(logoRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, '-=0.3')
    if (desktopLinksRef.current) {
      const linkEls = desktopLinksRef.current.children
      tl.fromTo(linkEls, { y: -20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, '-=0.2')
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(mobileOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(mobileLinksRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 })
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      gsap.to(barsRef.current[0], { y: 7, rotate: 45, backgroundColor: '#fff', duration: 0.3, ease: 'power2.inOut' })
      gsap.to(barsRef.current[1], { opacity: 0, duration: 0.15 })
      gsap.to(barsRef.current[2], { y: -7, rotate: -45, backgroundColor: '#fff', duration: 0.3, ease: 'power2.inOut' })
    } else {
      gsap.to(barsRef.current[0], { y: 0, rotate: 0, backgroundColor: '#e19d00', duration: 0.3, ease: 'power2.inOut' })
      gsap.to(barsRef.current[1], { opacity: 1, duration: 0.15, delay: 0.1 })
      gsap.to(barsRef.current[2], { y: 0, rotate: 0, backgroundColor: '#e19d00', duration: 0.3, ease: 'power2.inOut' })
    }
  }, [menuOpen])

  const isActive = (link) => {
    if (activeSection) {
      const activeClean = activeSection.toLowerCase().replace(/[^a-z0-9]/g, '')
      const linkClean = link.label.toLowerCase().replace(/[^a-z0-9]/g, '')
      return activeClean === linkClean
    }
    return location.pathname === link.to
  }

  const handleClick = (link, e) => {
    if (link.scrollTo) {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname === link.to) {
        setTimeout(() => {
          const el = document.getElementById(link.scrollTo)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        navigate(`${link.to}#${link.scrollTo}`)
      }
    } else if (link.label === 'Daksha' && location.pathname === '/daksha') {
      e.preventDefault()
      setMenuOpen(false)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 flex items-center justify-between bg-black/80 px-[clamp(16px,4vw,40px)] py-3.5 backdrop-blur-md" style={{ opacity: 0 }}>
        <Link to="/" className="flex items-center gap-2">
          <img ref={logoRef} className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" style={{ opacity: 0 }} />
        </Link>

        <div ref={desktopLinksRef} className="hidden items-center gap-3 lg:gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleClick(link, e)}
              className={`relative text-[11px] lg:text-[13px] uppercase tracking-[1.5px] lg:tracking-[2px] transition-colors duration-200 ${
                isActive(link)
                  ? 'text-gold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link) && (
                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-gold shadow-[0_0_6px_rgba(225,157,0,0.6)]" />
              )}
            </Link>
          ))}
        </div>

        <button
          ref={hamburgerRef}
          className="flex flex-col gap-[5px] md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span ref={(el) => { barsRef.current[0] = el }} className="block h-[2px] w-6 bg-gold" />
          <span ref={(el) => { barsRef.current[1] = el }} className="block h-[2px] w-6 bg-gold" />
          <span ref={(el) => { barsRef.current[2] = el }} className="block h-[2px] w-6 bg-gold" />
        </button>
      </nav>

      <div
        ref={mobileOverlayRef}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: 0 }}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <Link
              key={link.to}
              ref={(el) => { mobileLinksRef.current[i] = el }}
              to={link.to}
              onClick={(e) => handleClick(link, e)}
              className={`text-2xl uppercase tracking-[4px] transition-colors duration-200 ${
                isActive(link)
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif", opacity: 0 }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar

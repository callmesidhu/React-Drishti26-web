import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const links = [
  { label: 'Home', to: '/home' },
  { label: 'Daksha', to: '/daksha' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Competitions', to: '/competitions' },
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/about' },
]

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)
  const hideTimerRef = useRef(null)
  const isHoveredRef = useRef(false)
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
    // Initial state: hidden off-screen above viewport
    if (navRef.current) {
      gsap.set(navRef.current, { y: -90, opacity: 1 })
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, scale: 1 })
      if (desktopLinksRef.current) {
        gsap.set(desktopLinksRef.current.children, { opacity: 1, y: 0 })
      }
    }
  }, [])

  // Auto-hide by default, show for 3s on scroll
  useEffect(() => {
    const startHideTimer = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current && !menuOpen) {
          setVisible(false)
        }
      }, 3000)
    }

    const handleScroll = () => {
      if (menuOpen) return

      // Show navbar on scroll and keep for 3s
      setVisible(true)
      startHideTimer()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      y: visible || menuOpen ? 0 : -90,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [visible, menuOpen])

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    if (visible && !menuOpen) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current && !menuOpen) {
          setVisible(false)
        }
      }, 3000)
    }
  }

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

  const handleClick = () => {
    setMenuOpen(false)
    setVisible(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/80 px-[clamp(16px,4vw,40px)] py-3.5 backdrop-blur-md"
      >
        <Link to="/" className="flex items-center gap-2">
          <img ref={logoRef} className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" style={{ opacity: 0 }} />
        </Link>

        <div ref={desktopLinksRef} className="hidden items-center gap-3 lg:gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleClick()}
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
              onClick={() => handleClick()}
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

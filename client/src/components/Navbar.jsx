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
  { label: 'Contact', to: '/contact' },
]

function Navbar({ activeSection, theme = 'gold' }) {
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

  const isHome = location.pathname === '/' || location.pathname === '/home' || activeSection?.toLowerCase() === 'home'
  const isBlue = theme === 'blue' || activeSection?.toLowerCase() === 'daksha' || location.pathname.startsWith('/daksha')

  useEffect(() => {
    // Initial state: on Home page hidden off-screen above viewport; on other pages always visible at top
    if (navRef.current) {
      if (isHome) {
        gsap.set(navRef.current, { y: visible || menuOpen ? 0 : -90, opacity: 1 })
      } else {
        gsap.set(navRef.current, { y: 0, opacity: 1 })
      }
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, scale: 1 })
      if (desktopLinksRef.current) {
        gsap.set(desktopLinksRef.current.children, { opacity: 1, y: 0 })
      }
    }
  }, [isHome])

  // On Home page: auto-hide by default, show for 1.5s on scroll activity.
  // On all other pages: always show navbar, do not auto-hide.
  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }

    const startHideTimer = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        if (!isHoveredRef.current && !menuOpen) {
          setVisible(false)
        }
      }, 1500)
    }

    const handleScrollActivity = () => {
      if (menuOpen) return

      // Show navbar on any scroll activity (down or up) and keep for timer
      setVisible(true)
      startHideTimer()
    }

    window.addEventListener('scroll', handleScrollActivity, { passive: true })
    window.addEventListener('wheel', handleScrollActivity, { passive: true })
    window.addEventListener('touchmove', handleScrollActivity, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScrollActivity)
      window.removeEventListener('wheel', handleScrollActivity)
      window.removeEventListener('touchmove', handleScrollActivity)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [menuOpen, isHome])

  useEffect(() => {
    if (!navRef.current) return
    if (!isHome) {
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      })
      return
    }
    gsap.to(navRef.current, {
      y: visible || menuOpen ? 0 : -90,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [visible, menuOpen, isHome])

  const handleMouseEnter = () => {
    if (!isHome) return
    isHoveredRef.current = true
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
  }

  const handleMouseLeave = () => {
    if (!isHome) return
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
    const barColor = isBlue ? '#38bdf8' : '#e19d00'
    if (menuOpen) {
      gsap.to(barsRef.current[0], { y: 7, rotate: 45, backgroundColor: '#fff', duration: 0.3, ease: 'power2.inOut' })
      gsap.to(barsRef.current[1], { opacity: 0, duration: 0.15 })
      gsap.to(barsRef.current[2], { y: -7, rotate: -45, backgroundColor: '#fff', duration: 0.3, ease: 'power2.inOut' })
    } else {
      gsap.to(barsRef.current[0], { y: 0, rotate: 0, backgroundColor: barColor, duration: 0.3, ease: 'power2.inOut' })
      gsap.to(barsRef.current[1], { opacity: 1, duration: 0.15, delay: 0.1 })
      gsap.to(barsRef.current[2], { y: 0, rotate: 0, backgroundColor: barColor, duration: 0.3, ease: 'power2.inOut' })
    }
  }, [menuOpen, isBlue])

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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-[clamp(16px,4vw,40px)] py-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            ref={logoRef}
            className={`block h-10 w-auto transition-all duration-300 ${
              isBlue ? 'filter hue-rotate-[185deg] saturate-[180%] brightness-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]' : ''
            }`}
            src="/daksha/drishti-logo.png"
            alt="Drishti logo"
            style={{ opacity: 0 }}
          />
        </Link>

        <div ref={desktopLinksRef} className="hidden items-center gap-3 lg:gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleClick()}
              className={`relative text-[11px] lg:text-[13px] uppercase tracking-[1.5px] lg:tracking-[2px] transition-colors duration-200 ${
                isActive(link)
                  ? isBlue
                    ? 'text-sky-400 font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                    : 'text-gold font-semibold drop-shadow-[0_0_8px_rgba(225,157,0,0.6)]'
                  : isBlue
                    ? 'text-white/70 hover:text-sky-300'
                    : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link) && (
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] w-full ${
                    isBlue
                      ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                      : 'bg-gold shadow-[0_0_6px_rgba(225,157,0,0.6)]'
                  }`}
                />
              )}
            </Link>
          ))}
        </div>

        <button
          ref={hamburgerRef}
          className="flex flex-col gap-[5px] lg:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span ref={(el) => { barsRef.current[0] = el }} className={`block h-[2px] w-6 ${isBlue ? 'bg-sky-400' : 'bg-gold'}`} />
          <span ref={(el) => { barsRef.current[1] = el }} className={`block h-[2px] w-6 ${isBlue ? 'bg-sky-400' : 'bg-gold'}`} />
          <span ref={(el) => { barsRef.current[2] = el }} className={`block h-[2px] w-6 ${isBlue ? 'bg-sky-400' : 'bg-gold'}`} />
        </button>
      </nav>

      <div
        ref={mobileOverlayRef}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-2xl lg:hidden ${
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
                  ? isBlue
                    ? 'text-sky-400'
                    : 'text-gold'
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

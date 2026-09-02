import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const links = [
  { label: 'Home', to: '/home' },
<<<<<<< HEAD
  { label: 'Workshops', to: '/workshops' },
  { label: 'Competitions', to: '/competitions' },
  { label: 'Pro Shows', to: '/proshows' },
  { label: 'Daksha', to: '/daksha' },
=======
  { label: 'Daksha', to: '/daksha' },
  { label: 'Tech Events', to: '/workshops' },
>>>>>>> 8c7971786be70b08e53eca11cc50007ec155493d
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/about' },
]

function Navbar({ activeSection, theme = 'gold' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const hideTimerRef = useRef(null)
  const isHoveredRef = useRef(false)
  const location = useLocation()
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const desktopLinksRef = useRef(null)
  const mobileOverlayRef = useRef(null)
  const mobileLinksRef = useRef([])
  const barsRef = useRef([])

  const isHome = location.pathname === '/' || location.pathname === '/home' || activeSection?.toLowerCase() === 'home'
  const isBlue = theme === 'blue' || activeSection?.toLowerCase() === 'daksha' || location.pathname.startsWith('/daksha')
  const logoSrc = isBlue ? '/daksha/daksha-frame.png' : '/daksha/drishti-logo.png'

  // Automatically close menu when location changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Initial state setup for Navbar
  useEffect(() => {
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

  // On Home page: auto-hide on desktop, show on scroll/touch activity
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
      }, 3000)
    }

    const handleScrollActivity = () => {
      if (menuOpen) return
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

  // Slide navbar up / down
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

  // Animate Mobile Menu in/out
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      if (mobileOverlayRef.current) {
        gsap.killTweensOf(mobileOverlayRef.current)
        gsap.fromTo(
          mobileOverlayRef.current,
          { opacity: 0, pointerEvents: 'none' },
          { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' }
        )
      }
      if (mobileLinksRef.current.length > 0) {
        gsap.killTweensOf(mobileLinksRef.current)
        gsap.fromTo(
          mobileLinksRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: 'back.out(1.4)', delay: 0.08 }
        )
      }
    } else {
      document.body.style.overflow = ''
      if (mobileOverlayRef.current) {
        gsap.killTweensOf(mobileOverlayRef.current)
        gsap.to(mobileOverlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (mobileOverlayRef.current) {
              gsap.set(mobileOverlayRef.current, { pointerEvents: 'none' })
            }
          },
        })
      }
      if (mobileLinksRef.current.length > 0) {
        gsap.killTweensOf(mobileLinksRef.current)
        gsap.to(mobileLinksRef.current, {
          y: 20,
          opacity: 0,
          stagger: 0.02,
          duration: 0.2,
          ease: 'power2.in',
        })
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Animate Hamburger Icon into X and back
  useEffect(() => {
    const barColor = isBlue ? '#38bdf8' : '#D4AF37'
    if (barsRef.current[0] && barsRef.current[1] && barsRef.current[2]) {
      gsap.killTweensOf(barsRef.current)
      if (menuOpen) {
        gsap.to(barsRef.current[0], { y: 7, rotate: 45, backgroundColor: '#fff', duration: 0.25, ease: 'power2.inOut' })
        gsap.to(barsRef.current[1], { opacity: 0, duration: 0.15 })
        gsap.to(barsRef.current[2], { y: -7, rotate: -45, backgroundColor: '#fff', duration: 0.25, ease: 'power2.inOut' })
      } else {
        gsap.to(barsRef.current[0], { y: 0, rotate: 0, backgroundColor: barColor, duration: 0.25, ease: 'power2.inOut' })
        gsap.to(barsRef.current[1], { opacity: 1, duration: 0.15, delay: 0.05 })
        gsap.to(barsRef.current[2], { y: 0, rotate: 0, backgroundColor: barColor, duration: 0.25, ease: 'power2.inOut' })
      }
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

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget || e.target.tagName === 'NAV') {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-[clamp(16px,4vw,40px)] py-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
          <img
            ref={logoRef}
            className={`block h-12 w-auto transition-all duration-300 ${
              isBlue ? 'filter hue-rotate-[185deg] saturate-[180%] brightness-110 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]' : ''
            }`}
            src={logoSrc}
            alt={isBlue ? 'Daksha logo' : 'Drishti logo'}
          />
        </Link>

        <div ref={desktopLinksRef} className="hidden items-center gap-3 lg:gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={handleLinkClick}
              className={`relative text-[11px] lg:text-[13px] uppercase tracking-[1.5px] lg:tracking-[2px] transition-colors duration-200 ${
                isActive(link)
                  ? isBlue
                    ? 'text-sky-400 font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                    : 'text-gold font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]'
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
                      : 'bg-gold shadow-[0_0_6px_rgba(212,175,55,0.6)]'
                  }`}
                />
              )}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 active:scale-95 lg:hidden cursor-pointer touch-manipulation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            ref={(el) => { barsRef.current[0] = el }}
            className={`block h-[2px] w-6 origin-center rounded-full transition-colors ${isBlue ? 'bg-sky-400' : 'bg-gold'}`}
          />
          <span
            ref={(el) => { barsRef.current[1] = el }}
            className={`block h-[2px] w-6 origin-center rounded-full transition-colors ${isBlue ? 'bg-sky-400' : 'bg-gold'}`}
          />
          <span
            ref={(el) => { barsRef.current[2] = el }}
            className={`block h-[2px] w-6 origin-center rounded-full transition-colors ${isBlue ? 'bg-sky-400' : 'bg-gold'}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileOverlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-2xl lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <nav className="flex flex-col items-center gap-7 sm:gap-8">
          {links.map((link, i) => (
            <Link
              key={link.to}
              ref={(el) => { mobileLinksRef.current[i] = el }}
              to={link.to}
              onClick={handleLinkClick}
              className={`text-2xl sm:text-3xl font-medium uppercase tracking-[4px] transition-all duration-200 ${
                isActive(link)
                  ? isBlue
                    ? 'text-sky-400 font-semibold drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] scale-105'
                    : 'text-gold font-semibold drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-105'
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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

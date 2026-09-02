import { Suspense, lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import LoadingScreen from './components/LoadingScreen.jsx'

const Daksha = lazy(() => import('./pages/Daksha.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const TechEvents = lazy(() => import('./pages/techEvents.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const ProShows = lazy(() => import('./pages/ProShows.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      prevent: (node) => node.hasAttribute('data-lenis-prevent') || node.closest?.('[data-lenis-prevent]') != null,
    })

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    window.lenis = lenis

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  // Smooth reset to top on page navigation and refresh ScrollTrigger
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  useEffect(() => {
    if (!loading) {
      const raf = requestAnimationFrame(() => {
        ScrollTrigger.sort()
        ScrollTrigger.refresh()
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#050505] text-gold/80 uppercase tracking-[0.35em]">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/daksha" element={<Daksha />} />
            <Route path="/daksha/:slug" element={<Daksha />} />
            <Route path="/team" element={<Team />} />
            <Route path="/workshops" element={<TechEvents />} />
            <Route path="/workshops/:slug" element={<TechEvents />} />
            <Route path="/competitions" element={<TechEvents />} />
            <Route path="/competitions/:slug" element={<TechEvents />} />
            <Route path="/proshows" element={<ProShows />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      )}
    </>
  )
}

export default App

import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'

function Talks({ embedded = false }) {
  return (
    <div className={`relative min-h-svh w-full overflow-hidden ${embedded ? 'bg-transparent' : 'bg-[#050505] text-gold'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="talks" />}
      
      <main className="mx-auto max-w-[1200px] px-6 py-24 text-center">
        <h1 
          className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-gold-gradient mb-8" 
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Talks & Panels
        </h1>
        <p className="text-white/60">Details about keynote talks and panel discussions will be listed here.</p>
      </main>

      {!embedded && <Footer />}
    </div>
  )
}

export default Talks

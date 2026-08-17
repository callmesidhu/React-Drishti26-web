import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Workshops', to: '/workshops' },
  { label: 'Competitions', to: '/competitions' },
  { label: 'Aaram', to: '/aaram' },
  { label: 'Daksha', to: '/daksha' },
  { label: 'Team', to: '/team' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-black/80 px-[clamp(16px,4vw,40px)] py-3.5 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <img className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" />
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-[13px] uppercase tracking-[2px] transition-colors duration-200 ${
              location.pathname === link.to
                ? 'text-gold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button className="flex flex-col gap-[5px] md:hidden" aria-label="Menu">
        <span className="block h-[2px] w-6 bg-gold" />
        <span className="block h-[2px] w-6 bg-gold" />
        <span className="block h-[2px] w-6 bg-gold" />
      </button>
    </nav>
  )
}

export default Navbar

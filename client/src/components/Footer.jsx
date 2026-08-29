import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const footerRef = useRef(null)
  const columnsRef = useRef([])
  const copyrightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(columnsRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })

      gsap.fromTo(copyrightRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.3,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
    })

    return () => ctx.revert()
  }, [])

  const socials = [
    { name: 'Instagram', href: 'https://instagram.com', label: 'Instagram' },
    { name: 'LinkedIn', href: 'https://linkedin.com', label: 'LinkedIn' },
    { name: 'X', href: 'https://x.com', label: 'X' },
  ]

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#050505] text-black"
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-0 pt-8 lg:px-8">
        <div className="flex min-h-[220px] flex-col justify-between">
          <div className="grid gap-8 pb-8 md:grid-cols-[1fr_1fr_1fr_1fr] lg:gap-12">
            <div ref={(el) => { columnsRef.current[0] = el }} style={{ opacity: 0 }}>
              <div className="space-y-3 text-white/80">
                <h4
                  className="text-[11px] font-bold uppercase tracking-[4px] text-white/80"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Pages
                </h4>
                <ul className="space-y-2 text-[15px] font-light">
                  {[
                    { name: 'Home', path: '/home' },
                    { name: 'Daksha', path: '/daksha' },
                    { name: 'Workshops', path: '/workshops' },
                    { name: 'Competitions', path: '/competitions' },
                    { name: 'Pro Shows', path: '/proshows' },
                    { name: 'Team', path: '/team' },
                    { name: 'About Us', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                  ].map((page) => (
                    <li key={page.name}>
                      <a href={page.path} className="text-white/80 transition-colors duration-200 hover:text-white">
                        {page.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div ref={(el) => { columnsRef.current[1] = el }} style={{ opacity: 0 }}>
              <div className="space-y-3 text-white/80">
                <h4
                  className="text-[11px] font-bold uppercase tracking-[4px] text-white/80"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Contact
                </h4>
                <div className="space-y-2 text-[15px] font-light">
                  <a href="mailto:drishti@cet.ac.in" className="block text-white/80 transition-colors duration-200 hover:text-white">
                    drishti@cet.ac.in
                  </a>
                  <p className="text-white/80">Gautam KJ: +91 85905 40376</p>
                  <p className="text-white/80">Convenor, Drishti'26</p>
                </div>
              </div>
            </div>

            <div ref={(el) => { columnsRef.current[2] = el }} style={{ opacity: 0 }}>
              <div className="space-y-3 text-white/80">
                <h4
                  className="text-[11px] font-bold uppercase tracking-[4px] text-white/80"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  Location
                </h4>
               
                <a href="https://maps.google.com/?q=College+of+Engineering+Trivandrum" target="_blank" rel="noreferrer" className="mt-3 block overflow-hidden rounded-md border border-white/20">
                   <p className="text-[15px] font-light text-white/80">College of Engineering Trivandrum</p>
                </a>
              </div>
            </div>

            <div ref={(el) => { columnsRef.current[3] = el }} style={{ opacity: 0 }}>
          
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-black/40 bg-[#050505]">
        <div className="mx-auto max-w-[1600px] px-0">
          <div
            className="relative h-[180px] w-full overflow-hidden sm:h-[200px] md:h-[220px] lg:h-[260px] xl:h-[295px]"
            style={{
              backgroundImage: "url('/home/footer.jpg.jpeg')",
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      </div>

      <div className="bg-[#050505]">
        <div className="mx-auto max-w-[220px] px-2 py-2 text-center">
          <p ref={copyrightRef} className="text-[8px] uppercase tracking-[1.5px] text-[#d8a52a]" style={{ opacity: 0 }}>
            © 2026 DRISHTI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

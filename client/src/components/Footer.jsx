import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const footerRef = useRef(null)
  const columnsRef = useRef([])
  const copyrightRef = useRef(null)
  const socialsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(columnsRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })

      gsap.fromTo(copyrightRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.5,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })

      gsap.fromTo(socialsRef.current, { y: 10, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.6,
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-[#1a1a1a] border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div ref={(el) => { columnsRef.current[0] = el }} style={{ opacity: 0 }}>
            <img className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" />
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/40">
              Lorem ipsum dolor sit amet consectetur. Pulvinar amet nunc acu mauris lectus mauris enim feugiat.
              Blandit in nulla non. Morbi et aliquam egestas enim in eget ris pharetra. Massa justo sad fermentum odio.
            </p>
          </div>

          <div ref={(el) => { columnsRef.current[1] = el }} style={{ opacity: 0 }}>
            <h4
              className="text-sm font-bold uppercase tracking-[3px] text-white"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Pages
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                { name: 'Home', path: '/home' },
                { name: 'Daksha', path: '/daksha' },
                { name: 'Workshops', path: '/workshops' },
                { name: 'Competitions', path: '/competitions' },
                { name: 'Pro Shows', path: '/proshows' },
                { name: 'Exhibitions', path: '/exhibitions' },
                { name: 'Talks', path: '/talks' },
                { name: 'Team', path: '/team' },
                { name: 'About Us', path: '/about' },
              ].map((page) => (
                <li key={page.name}>
                  <a href={page.path} className="text-sm text-white/40 transition-colors duration-200 hover:text-gold">
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div ref={(el) => { columnsRef.current[2] = el }} style={{ opacity: 0 }}>
            <h4
              className="text-sm font-bold uppercase tracking-[3px] text-white"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Contact
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="mailto:drishti@cet.ac.in" className="text-sm text-white/40 transition-colors duration-200 hover:text-gold">
                  drishti@cet.ac.in
                </a>
              </li>
              <li className="text-sm text-white/40">
                <span className="text-white/60">Karun Tony :</span> +91 99958541611
              </li>
              <li className="text-sm text-white/40">
                <span className="text-white/60">Karun Tony :</span> +91 99958541611
              </li>
            </ul>
          </div>

          <div ref={(el) => { columnsRef.current[3] = el }} style={{ opacity: 0 }}>
            <h4
              className="text-sm font-bold uppercase tracking-[3px] text-white"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Location
            </h4>
            <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
              <img
                src="https://maps.googleapis.com/maps/api/staticmap?center=College+of+Engineering+Trivandrum&zoom=15&size=400x200&maptype=roadmap&markers=color:gold%7CCollege+of+Engineering+Trivandrum&key=&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:administrative.country|element:geometry.stroke|color:0x4b6878&style=feature:landscape|element:all|color:0x1a1a1a&style=feature:poi|element:all|color:0x1a1a1a&style=feature:road|element:all|color:0x2a2a2a&style=feature:water|element:all|color:0x0e1626"
                alt="College of Engineering Trivandrum"
                className="block w-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <p className="mt-3 text-xs text-white/30">College of Engineering Trivandrum</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-[clamp(16px,4vw,40px)] py-6">
          <p ref={copyrightRef} className="text-xs text-white/30" style={{ opacity: 0 }}>© 2026 Drishti. All rights reserved.</p>
          <div className="flex gap-4">
            {['Instagram', 'LinkedIn', 'Twitter'].map((social, i) => (
              <a
                key={social}
                ref={(el) => { socialsRef.current[i] = el }}
                href="#"
                className="text-xs text-white/30 transition-colors duration-200 hover:text-gold"
                style={{ opacity: 0 }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

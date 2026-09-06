import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  { name: 'YouTube', href: 'https://www.youtube.com/@DrishtiCET', label: 'YouTube' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/drishticet', label: 'LinkedIn' },
  { name: 'Instagram', href: 'https://www.instagram.com/drishticet', label: 'Instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/drishticet/', label: 'Facebook' },]

 const SocialIcon = ({ name }) => {
  const icons = {
   YouTube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
     <path d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.14C19.48 3.5 12 3.5 12 3.5s-7.48 0-9.37.56A3.03 3.03 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.14c1.89.56 9.37.56 9.37.56s7.48 0 9.37-.56a3.03 3.03 0 0 0 2.13-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.75 15.5v-7l6.25 3.5-6.25 3.5Z" />
    </svg>
   ),
   LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
     <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 9.78h2.9V18H5.5V9.78Zm4.7 0h2.77v1.13h.04c.38-.73 1.33-1.5 2.74-1.5 2.94 0 3.48 1.93 3.48 4.43V18h-2.9v-16c0-1.13-.02-2.58-1.57-2.58-1.58 0-1.82 1.23-1.82 2.5V18h-2.9V9.78Z" />
    </svg>
   ),
   Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
     <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5A3.95 3.95 0 0 0 16.25 3.8h-8.5Zm8.97 2.45a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 6.5A5.5 5.5 0 1 1 12 17.5 5.5 5.5 0 0 1 12 6.5Zm0 1.8A3.7 3.7 0 1 0 12 16.7a3.7 3.7 0 0 0 0-7.4Z" />
    </svg>
   ),
   Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
     <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V7.2c0-.9.3-1.6 1.7-1.6H16V2.7c-.3-.1-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.4V10.8H7v3.2h2.3v8h4.2Z" />
    </svg>
   ),
  }

  return icons[name] || null
 }

 return (
  <footer
   ref={footerRef}
   className="relative overflow-hidden bg-[#050505] text-black"
  >
   <div className="mx-auto max-w-[1600px] px-5 pb-0 pt-8 lg:px-8">
    <div className="flex min-h-[220px] flex-col justify-between">
      <div className="grid gap-8 pb-8 md:grid-cols-[1fr_1fr_1.6fr] lg:gap-12">
      <div ref={(el) => { columnsRef.current[0] = el }} style={{ opacity: 0 }}>
       <div className="space-y-3 text-white/80">
        <h4
         className="text-[11px] font-bold uppercase tracking-[4px] text-white/80"
         style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
         Pages
        </h4>
        <ul className="space-y-2 text-[15px] font-light lg:columns-2 lg:gap-10">
         {[
          { name: 'Home', path: '/' },
          { name: 'Daksha', path: '/daksha' },
          { name: 'Workshops', path: '/workshops' },
          { name: 'Competitions', path: '/competitions' },
          { name: 'Team', path: '/team' },
          { name: 'About Us', path: '/about' },
          { name: 'Contact', path: '/contact' },
         ].map((page) => (
          <li key={page.name} className="break-inside-avoid">
           <Link to={page.path} className="text-white/80 transition-colors duration-200 hover:text-white">
            {page.name}
           </Link>
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

         <div className="mt-4 flex items-center gap-3 pt-1">
          {socials.map((social) => (
           <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8a52a] hover:text-[#d8a52a]"
           >
            <SocialIcon name={social.name} />
           </a>
          ))}
         </div>
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

        <div className="relative mt-2 w-full overflow-hidden rounded-lg border border-white/20 transition-all duration-300 hover:border-gold/60">
         <iframe
          title="CET Mini Map"
          src="https://maps.google.com/maps?q=8.5458513,76.9063407&t=k&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="140"
          className="block w-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
         />
         <a
          href="https://www.google.com/maps/place/College+of+Engineering+Trivandrum+(CET)/@8.5458513,76.9037658,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bec79541c519:0x98324eb5aafb3778!8m2!3d8.5458513!4d76.9063407!16zL20vMDVtcTdz"
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-10 block cursor-pointer"
          aria-label="Open College of Engineering Trivandrum in Google Maps"
         />
        </div>

        <a
         href="https://www.google.com/maps/place/College+of+Engineering+Trivandrum+(CET)/@8.5458513,76.9037658,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bec79541c519:0x98324eb5aafb3778!8m2!3d8.5458513!4d76.9063407!16zL20vMDVtcTdz"
         target="_blank"
         rel="noreferrer"
         className="inline-block text-[14px] font-light text-white/80 transition-colors duration-200 hover:text-gold-gradient"
        >
         College of Engineering Trivandrum (CET) ↗
        </a>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/*
   <div className="relative overflow-hidden border-t border-black/40 bg-[#050505]">
    <div className="mx-auto max-w-[1600px] px-0">
     <div
      className="relative h-[180px] w-full overflow-hidden sm:h-[200px] md:h-[220px] lg:h-[260px] xl:h-[295px]"
      style={{
       backgroundImage: "url('/home/footer.jpg.webp')",
       backgroundSize: '100% 100%',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat',
      }}
     />
    </div>
   </div>
   */}
   <picture>
    <source media="(max-width: 767px)" srcSet="/home/footer-mobile.webp" />
    <img
     src="/home/footer.jpg.webp"
     alt=""
     aria-hidden="true"
     loading="lazy"
     decoding="async"
     className="block h-auto w-full"
    />
   </picture>
   <div className="bg-[#050505]">
     <div className="mx-auto max-w-none px-4 py-3 text-center">
      <p ref={copyrightRef} className="whitespace-nowrap text-[8px] uppercase tracking-[1.5px] text-[#d8a52a]" style={{ opacity: 0 }}>
      © 2026 DRISHTI. ALL RIGHTS RESERVED.
     </p>
    </div>
   </div>
  </footer>
 )
}

export default Footer

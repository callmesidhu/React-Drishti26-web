<<<<<<< HEAD
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
=======
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

// ---- Footer assets ----
const footerLogo = "/home/drishti-logo.png";
const footerMap = "/home/map-footer.png";

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "Workshops", href: "#workshops" },
  { label: "Competitions", href: "#competitions" },
  { label: "Daksha", href: "#daksha" },
  { label: "Team", href: "#team" },
  { label: "About Us", href: "#about" },
];

const contactDetails = [
  { label: "drishti@cet.ac.in", href: "mailto:drishti@cet.ac.in" },
  { label: "Karun Tony : +91 9958541161", href: "tel:+919958541161" },
  { label: "Karun Tony : +91 9958541161", href: "tel:+919958541161" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FaFacebook },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn", href: "#", Icon: FaLinkedin },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];
>>>>>>> 6843c7790ec8a60e526c3c46397fd21b91c2433a

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
<<<<<<< HEAD
    <footer ref={footerRef} className="relative bg-[#1a1a1a] border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div ref={(el) => { columnsRef.current[0] = el }} style={{ opacity: 0 }}>
            <img className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" />
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/40">
              Lorem ipsum dolor sit amet consectetur. Pulvinar amet nunc acu mauris lectus mauris enim feugiat.
              Blandit in nulla non. Morbi et aliquam egestas enim in eget ris pharetra. Massa justo sad fermentum odio.
=======
    <footer className="w-full bg-[#383838] px-11 py-16" aria-label="Site footer">
      <div className="mx-auto flex max-w-[1352px] flex-wrap justify-between gap-16">
        {/* Brand + blurb */}
        <div className="max-w-[269px]">
          <div className="mb-3 flex items-center gap-2">
            <img
              className="h-[39px] w-[41px] object-contain"
              alt="Drishti"
              src={footerLogo}
            />
            <p className="font-['Satoshi-Bold',Helvetica] text-[15px] font-bold leading-[normal] text-[#999]">
              Drishti 2026
>>>>>>> 6843c7790ec8a60e526c3c46397fd21b91c2433a
            </p>
          </div>
          <p className="font-['Satoshi-Medium',Helvetica] text-xs font-normal leading-[normal] text-[#999]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet nunc arcu
            mauris lectus mauris enim feugiat. Blandit in nulla in non. Morbi
            et aliquam egestas enim in eget nisl pharetra. Massa justo sed
            fermentum odio.
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
                { name: 'Home', path: '/daksha' },
                { name: 'Workshops', path: '/workshops' },
                { name: 'Competitions', path: '/competitions' },
                { name: 'Pro Shows', path: '/proshows' },
                { name: 'Exhibitions', path: '/exhibitions' },
                { name: 'Talks', path: '/talks' },
                { name: 'Daksha', path: '/daksha' },
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

<<<<<<< HEAD
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
=======
        {/* Contact */}
        <div>
          <p className="mb-4 font-['Satoshi-Medium',Helvetica] text-[15px] font-normal leading-[normal] text-[#9a9a9a]">
            Contact
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {contactDetails.map((contact, index) => (
              <li key={index}>
                <a
                  href={contact.href}
                  className="font-['Satoshi-Medium',Helvetica] text-xs font-normal leading-[normal] text-[#a4a4a4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3" aria-label="Social media links">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#b7b7b7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
>>>>>>> 6843c7790ec8a60e526c3c46397fd21b91c2433a
              >
                <Icon size={20} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="mb-4 font-['Satoshi-Medium',Helvetica] text-[15px] font-normal leading-[normal] text-[#9a9a9a]">
            Location
          </p>
          <a
            href="https://maps.google.com/?q=College+of+Engineering+Trivandrum"
            target="_blank"
            rel="noreferrer"
            className="block h-[244px] w-[191px] overflow-hidden rounded-xl bg-[#676767] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <img
              className="h-full w-full object-cover"
              alt="Map location of College of Engineering Trivandrum"
              src={footerMap}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
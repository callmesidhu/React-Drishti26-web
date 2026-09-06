import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const MAP_URL =
 'https://www.google.com/maps/place/College+of+Engineering+Trivandrum+(CET)/@8.5458513,76.9037658,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bec79541c519:0x98324eb5aafb3778!8m2!3d8.5458513!4d76.9063407!16zL20vMDVtcTdz?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D'

const CONTACT_GROUPS = [
 { role: 'Event Convener', people: [{ name: 'Gautam KJ', phone: '+91 8590 540 376', email: 'gautamkj2468@gmail.com' }] },
 { role: 'Finance Coordinator', people: [{ name: 'Daris Benny', phone: '+91 9778 135 924', email: 'darisbenny10@gmail.com' }] },
 {
 role: 'Event Coordinators',
 people: [
 { name: 'Ephrem Mathews', phone: '+91 9447 434 346', email: 'mathewsephrem@gmail.com' },
 { name: 'Nikhil Zacharias', phone: '+91 8075 962 883', email: 'nikhilzacharias425@gmail.com' },
 ],
 },
 {
 role: 'Sponsorship Conveners',
 people: [
 { name: 'Meriya Eleyas', phone: '+91 8590 980 718', email: 'meriyaeleyas04@gmail.com' },
 { name: 'Mhd. Yamin Beck', phone: '+91 7012 837 399', email: 'yaminmuhammedbeck@gmail.com' },
 ],
 },
]

function Contact() {
 const h1Ref = useRef(null)
 const subheadRef = useRef(null)
 const leftColRef = useRef(null)
 const rightColRef = useRef(null)

 useEffect(() => {
 applyLetterGradient(h1Ref.current)

 const ctx = gsap.context(() => {
 gsap.fromTo(
 h1Ref.current,
 { y: 60, opacity: 0, scale: 0.95 },
 { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
 )
 gsap.fromTo(
 subheadRef.current,
 { y: 30, opacity: 0 },
 { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.2 }
 )

 if (leftColRef.current) {
 gsap.fromTo(
 leftColRef.current.children,
 { y: 40, opacity: 0 },
 {
 y: 0,
 opacity: 1,
 stagger: 0.12,
 duration: 0.7,
 ease: 'power2.out',
 scrollTrigger: { trigger: leftColRef.current, start: 'top 85%' },
 }
 )
 }

 if (rightColRef.current) {
 gsap.fromTo(
 rightColRef.current,
 { scale: 0.96, opacity: 0 },
 {
 scale: 1,
 opacity: 1,
 duration: 0.8,
 ease: 'power3.out',
 scrollTrigger: { trigger: rightColRef.current, start: 'top 85%' },
 }
 )
 }
 })

 return () => ctx.revert()
 }, [])

 return (
 <>
 <div className="relative min-h-svh w-full overflow-hidden bg-[#050505] text-gold">
 <Backdrop />
 <Navbar activeSection="contact" />

 {/* Header */}
 <header className="px-[clamp(16px,4vw,40px)] pt-[clamp(75px,9vw,110px)] text-center">
 <p className="text-[10px] md:text-[11px] uppercase tracking-[6px] text-gold/60">Get In Touch</p>
 <h1
 ref={h1Ref}
 className="mt-1 text-[clamp(40px,8vw,100px)] font-bold uppercase leading-none tracking-tight"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
 >
 CONTACT
 </h1>
 <p
 ref={subheadRef}
 className="mt-2 text-[clamp(12px,2vw,18px)] uppercase tracking-[3px] md:tracking-[4px] text-white/70"
 style={{ fontFamily: "'Space Grotesk', sans-serif", opacity: 0 }}
 >
 Drishti 2026 · College of Engineering Trivandrum
 </p>
 </header>

 {/* Contact directory and satellite map */}
 <main className="mx-auto mt-8 md:mt-12 max-w-[1240px] px-[clamp(16px,4vw,40px)] pb-16 md:pb-24">
 <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-12">
 {/* Left Column: Direct Contact Info */}
 <div ref={leftColRef} className="flex flex-col gap-4 lg:col-span-5">
 <div className="relative rounded-2xl border border-gold/30 bg-black/70 p-4 md:p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
 <div className="relative mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3 lg:justify-center">
 <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-gold/70">
 <span className="h-1.5 w-1.5 rotate-45 bg-gold-gradient" />
 Contact Directory
 </div>
 <span className="font-mono text-[10px] text-white/40 lg:absolute lg:right-0">DRISHTI&apos;26</span>
 </div>

 <div className="space-y-4">
 {CONTACT_GROUPS.map(({ role, people }) => (
 <section key={role}>
 <h2 className="mb-2 text-center text-[10px] font-bold uppercase tracking-[2px] text-gold-gradient">{role}</h2>
 <div className={`gap-2.5 ${people.length === 1 ? 'flex justify-center' : 'grid sm:grid-cols-2'}`}>
 {people.map(({ name, phone, email }) => (
 <div key={name} className="w-full max-w-[300px] rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center transition-colors duration-300 hover:border-gold/40">
 <p className="text-sm font-bold uppercase tracking-wide text-white">{name}</p>
 <a href={`tel:${phone.replace(/\s/g, '')}`} className="mt-1 block text-xs font-mono text-white/75 transition-colors hover:text-gold">{phone}</a>
 <a href={`mailto:${email}`} className="mt-1 block break-all text-[11px] leading-tight text-white/55 transition-colors hover:text-gold">{email}</a>
 </div>
 ))}
 </div>
 </section>
 ))}
 </div>

 </div>

 <div className="relative rounded-2xl border border-gold/20 bg-black/50 p-4 backdrop-blur-xl">
 <div className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-gold/70">
 <span className="h-1.5 w-1.5 rotate-45 bg-gold-gradient" />
 Email
 </div>
 <a href="mailto:drishti@cet.ac.in" className="mt-2 block text-sm font-semibold text-gold-gradient transition-colors hover:text-white">drishti@cet.ac.in</a>
 </div>
 </div>

 {/* Right Column: High-Tech Satellite Google Map */}
 <div
 ref={rightColRef}
 className="relative flex flex-col rounded-2xl border border-gold/30 bg-black/80 p-3 md:p-4 backdrop-blur-2xl lg:col-span-7 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
 >
 {/* Satellite Header Bar */}
 <div className="mb-2.5 flex items-center justify-between border-b border-white/10 px-2 pb-2.5 pt-1">
 <div className="flex items-center gap-2">
 <span className="relative flex h-2.5 w-2.5">
 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/75" />
 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-gradient" />
 </span>
 <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[2px] text-white">
 Satellite View · CET Campus
 </span>
 </div>
 <span className="font-mono text-[10px] md:text-[11px] text-white/50">
 8.5458° N, 76.9063° E
 </span>
 </div>

 {/* Embedded Satellite Map */}
 <div className="relative min-h-[280px] md:min-h-[420px] flex-1 overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a]">
 <iframe
 title="CET Satellite Map"
 src="https://maps.google.com/maps?q=8.5458513,76.9063407&t=k&z=17&ie=UTF8&iwloc=&output=embed"
 width="100%"
 height="100%"
 className="absolute inset-0 h-full w-full border-0"
 allowFullScreen=""
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 />
 </div>

 {/* Action Bar */}
 <div className="mt-3.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
 <p className="text-xs text-white/60">
 Direct route & navigation to College of Engineering Trivandrum
 </p>
 <a
 href={MAP_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 rounded-none border border-[#D4AF37]/70 bg-gold-gradient px-6 py-2.5 md:px-7 md:py-3 text-xs font-bold uppercase tracking-[2px] md:tracking-[2.5px] text-black transition-all duration-300 hover:brightness-110 cursor-pointer"
 >
 Open in Google Maps
 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
 </svg>
 </a>
 </div>

 <div className="mt-4 border-t border-white/10 px-1 pt-3">
 <p className="text-[10px] uppercase tracking-[2px] text-gold/70">College of Engineering Trivandrum (CET)</p>
 <p className="mt-1 text-xs leading-relaxed text-white/65">Engineering College P.O, Sreekaryam, Thiruvananthapuram, Kerala 695016</p>
 </div>
 </div>
 </div>
 </main>
 </div>
 <Footer />
 </>
 )
}

export default Contact

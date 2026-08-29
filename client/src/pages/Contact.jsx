import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const contactCards = [
  {
    icon: (
      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Us',
    subtitle: 'Official festival correspondence',
    primary: 'drishti@ksit.edu.in',
    secondary: 'contact@drishti2026.com',
    link: 'mailto:drishti@ksit.edu.in',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Helpline Numbers',
    subtitle: 'Student Conveners & Support',
    primary: '+91 99958 54161 (Karun)',
    secondary: '+91 94462 87654 (Helpdesk)',
    link: 'tel:+919995854161',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Festival Venue',
    subtitle: 'College of Engineering Trivandrum',
    primary: 'Engineering College P.O, Sreekaryam',
    secondary: 'Thiruvananthapuram, Kerala 695016',
    link: 'https://maps.google.com/?q=College+of+Engineering+Trivandrum',
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Quick Coordination',
    subtitle: 'Live Desk & WhatsApp Support',
    primary: 'Available 9:00 AM – 9:00 PM',
    secondary: 'Instant Response on WhatsApp',
    link: 'https://wa.me/919995854161',
  },
]

const departments = [
  { dept: 'Daksha & Startup Pitching', contact: 'daksha@drishti2026.com', phone: '+91 98471 23456' },
  { dept: 'Technical Competitions & Robo Wars', contact: 'competitions@drishti2026.com', phone: '+91 94462 34567' },
  { dept: 'Workshops & Hands-On Labs', contact: 'workshops@drishti2026.com', phone: '+91 97453 45678' },
  { dept: 'Sponsorship, Media & PR', contact: 'sponsors@drishti2026.com', phone: '+91 96454 56789' },
  { dept: 'Hospitality & Accommodation', contact: 'hospitality@drishti2026.com', phone: '+91 95455 67890' },
]

const faqs = [
  {
    q: 'How can I register for competitions and workshops?',
    a: 'You can browse any event in Competitions, Workshops, or Daksha, click "View Details", and hit "Register" to secure your slot directly via our official registration gateway.',
  },
  {
    q: 'Is accommodation provided for outstation participants?',
    a: 'Yes, hostel and guesthouse accommodation within the CET campus is available on a first-come, first-served basis. Contact our hospitality team for bookings.',
  },
  {
    q: 'Will participants receive certificates?',
    a: 'All registered attendees participating in workshops and competitions will receive verified digital certificates issued by Drishti 2026 and KSIT.',
  },
  {
    q: 'How do I reach the venue from Trivandrum Central railway station / airport?',
    a: 'CET is located 12km from Trivandrum Central Station and 14km from Trivandrum International Airport. Direct KSRTC buses, auto-rickshaws, and ride-hailing cabs are readily available.',
  },
]

function Contact() {
  const h1Ref = useRef(null)
  const subheadRef = useRef(null)
  const cardsRef = useRef([])
  const formRef = useRef(null)
  const deptsRef = useRef(null)
  const faqRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Enquiry',
    message: '',
  })

  useEffect(() => {
    applyLetterGradient(h1Ref.current)
    applyLetterGradient(subheadRef.current)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        h1Ref.current,
        { y: 80, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      )
      gsap.fromTo(
        subheadRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.25 }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' },
          }
        )
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
          }
        )
      }

      if (deptsRef.current) {
        gsap.fromTo(
          deptsRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: deptsRef.current, start: 'top 80%' },
          }
        )
      }

      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: faqRef.current, start: 'top 85%' },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', category: 'General Enquiry', message: '' })
    }, 4000)
  }

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#050505] text-gold">
      <Backdrop />
      <Navbar activeSection="contact" />

      {/* Header Section */}
      <header className="px-[clamp(16px,4vw,40px)] pt-[clamp(40px,8vw,80px)] text-center">
        <p className="text-[11px] uppercase tracking-[6px] text-gold/60">Get In Touch</p>
        <h1
          ref={h1Ref}
          className="mt-2 text-[clamp(40px,8vw,96px)] font-bold uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
        >
          CONTACT US
        </h1>
        <p
          ref={subheadRef}
          className="mt-3 text-[clamp(16px,2.5vw,26px)] uppercase tracking-[4px]"
          style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif", opacity: 0 }}
        >
          Drishti 2026 Coordination & Helpdesk
        </p>
      </header>

      {/* 4 Fast Contact Cards */}
      <section className="mx-auto mt-12 max-w-[1300px] px-[clamp(16px,4vw,40px)]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, i) => (
            <a
              key={card.title}
              ref={(el) => { cardsRef.current[i] = el }}
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col justify-between border border-gold/25 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-[#111] hover:shadow-[0_0_30px_rgba(225,157,0,0.25)]"
              style={{ opacity: 0 }}
            >
              {/* Corner Reticle Accents */}
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold/60 transition-colors duration-300 group-hover:border-gold" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold/60 transition-colors duration-300 group-hover:border-gold" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold/60 transition-colors duration-300 group-hover:border-gold" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold/60 transition-colors duration-300 group-hover:border-gold" />

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold/20">
                  {card.icon}
                </div>
                <h3
                  className="mt-5 text-lg font-bold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-gold"
                  style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="mt-1 text-xs text-white/50">{card.subtitle}</p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-gold/90">{card.primary}</p>
                <p className="mt-1 text-xs text-white/60">{card.secondary}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Main 2-Column Interactive Form & Department Hub */}
      <section className="mx-auto mt-16 max-w-[1300px] px-[clamp(16px,4vw,40px)] pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Interactive Contact Form */}
          <div
            ref={formRef}
            className="relative rounded-2xl border border-gold/30 bg-black/70 p-6 backdrop-blur-xl md:p-10 lg:col-span-7 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          >
            {/* Luminous Reticles */}
            <span className="absolute -top-1.5 -left-1.5 h-5 w-5 border-t-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 border-t-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-5 w-5 border-b-2 border-l-2 border-gold shadow-[0_0_8px_#e19d00]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-5 w-5 border-b-2 border-r-2 border-gold shadow-[0_0_8px_#e19d00]" />

            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-gold/70">Transmit Message</p>
              <h2
                className="mt-1 text-[clamp(24px,4vw,38px)] font-bold uppercase leading-tight text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                Send Us an Inquiry
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Have a question about event rules, partnership opportunities, or registration? Fill out the form below.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-gold/40 bg-gold/10 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-black text-gold shadow-[0_0_20px_rgba(225,157,0,0.5)]">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="mt-4 text-2xl font-bold uppercase text-gold"
                  style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
                >
                  Message Transmitted!
                </h3>
                <p className="mt-2 max-w-[400px] text-sm text-white/75">
                  Thank you for reaching out. A Drishti 2026 coordinator will respond to your query shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[2px] text-gold/80">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[2px] text-gold/80">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[2px] text-gold/80">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[2px] text-gold/80">Inquiry Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-white/15 bg-black/90 px-4 py-3 text-sm text-white backdrop-blur-sm transition-all duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Daksha Startup Pitch">Daksha Startup Pitching</option>
                      <option value="Competitions & Robo Wars">Competitions & Robo Wars</option>
                      <option value="Workshops & Labs">Workshops & Hands-On Labs</option>
                      <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                      <option value="Hospitality & Accommodation">Hospitality & Accommodation</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-[2px] text-gold/80">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your query or proposal in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-3 border border-gold bg-gold px-8 py-3.5 text-xs font-bold uppercase tracking-[3px] text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_30px_rgba(225,157,0,0.5)] cursor-pointer"
                  style={{ borderRadius: '50px' }}
                >
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Department Coordinators Hub & Campus Directions */}
          <div ref={deptsRef} className="flex flex-col gap-6 lg:col-span-5">
            {/* Department Hub */}
            <div className="relative rounded-2xl border border-gold/20 bg-black/60 p-6 backdrop-blur-xl md:p-8">
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold" />

              <h3
                className="text-xl font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                Department Point of Contacts
              </h3>
              <p className="mt-1 text-xs text-white/50">Direct lines to event managers & coordinators</p>

              <div className="mt-6 flex flex-col divide-y divide-white/10">
                {departments.map((d) => (
                  <div key={d.dept} className="py-3.5 first:pt-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">{d.dept}</p>
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <a href={`mailto:${d.contact}`} className="text-white/60 hover:text-white transition-colors duration-200">
                        {d.contact}
                      </a>
                      <a href={`tel:${d.phone.replace(/\s+/g, '')}`} className="font-mono text-white/80 hover:text-gold transition-colors duration-200">
                        {d.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Directions & Map Link */}
            <div className="relative rounded-2xl border border-gold/20 bg-black/60 p-6 backdrop-blur-xl md:p-8">
              <span className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-gold" />
              <span className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-gold" />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-gold" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-gold" />

              <h3
                className="text-xl font-bold uppercase tracking-wider text-white"
                style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
              >
                Campus Location
              </h3>
              <p className="mt-1 text-xs text-white/50">College of Engineering Trivandrum (CET)</p>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <iframe
                  title="CET Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.399587420556!2d76.90382027589947!3d8.547073291496734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05befaf7912443%3A0xc319114adfb82c6d!2sCollege%20of%20Engineering%20Trivandrum%20(CET)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="160"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://maps.google.com/?q=College+of+Engineering+Trivandrum"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gold/40 bg-gold/10 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold transition-all duration-200 hover:bg-gold hover:text-black"
              >
                Open in Google Maps
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div ref={faqRef} className="mt-20 border-t border-gold/20 pt-16">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[5px] text-gold/60">Frequently Asked Questions</p>
            <h2
              className="mt-2 text-[clamp(28px,4.5vw,46px)] font-bold uppercase tracking-tight text-white"
              style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
            >
              Need Quick Help?
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-[860px] flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden transition-colors duration-200 hover:border-gold/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white transition-colors duration-200 hover:text-gold cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`text-gold transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-white/10 px-5 pb-5 pt-3 text-xs leading-relaxed text-white/70">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Contact

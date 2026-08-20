function Footer() {
  return (
    <footer className="relative bg-[#1a1a1a] border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" />
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/40">
              Lorem ipsum dolor sit amet consectetur. Pulvinar amet nunc acu mauris lectus mauris enim feugiat.
              Blandit in nulla non. Morbi et aliquam egestas enim in eget ris pharetra. Massa justo sad fermentum odio.
            </p>
          </div>

          <div>
            <h4
              className="text-sm font-bold uppercase tracking-[3px] text-white"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Pages
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {['Home', 'Workshops', 'Competitions', 'Aaram', 'Daksha', 'Team', 'About Us', 'Contact'].map((page) => (
                <li key={page}>
                  <a href={`/${page.toLowerCase().replace(' ', '')}`} className="text-sm text-white/40 transition-colors duration-200 hover:text-gold">
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
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

          <div>
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
          <p className="text-xs text-white/30">© 2026 Drishti. All rights reserved.</p>
          <div className="flex gap-4">
            {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-white/30 transition-colors duration-200 hover:text-gold"
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

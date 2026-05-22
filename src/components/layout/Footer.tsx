import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white/70">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-black text-white mb-3">
              WASH<span className="text-[#F5C518]">HUB</span>
            </div>
            <p className="text-sm leading-relaxed">
              Artigiani del lavaggio auto a Catania dal 2022. Due sedi, una sola ossessione: la perfezione.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors text-sm">
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors text-sm">
                FB
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors text-sm">
                TK
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              {[['Home', '/'], ['Servizi', '/servizi'], ['Le nostre sedi', '/sedi'], ['Chi siamo', '/chi-siamo'], ['Prenota', '/prenota'], ['Contatti', '/contatti']].map(([l, h]) => (
                <li key={h}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Sedi */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Le sedi</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white font-medium">WASH HUB Lungomare</p>
                <p>Via del Lungomare, Catania</p>
                <p>Lun–Sab 8:00–20:00</p>
              </div>
              <div>
                <p className="text-[#F5C518] font-medium">WASH HUB POP · Paesi Etnei</p>
                <p>Paesi Etnei, Catania</p>
                <p className="text-[#F5C518]">Aperto 24/7</p>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@parkinglungomare.it" className="hover:text-white transition-colors">
                  info@parkinglungomare.it
                </a>
              </li>
              <li>
                <a href="tel:+39000000000" className="hover:text-white transition-colors">
                  +39 000 000 0000
                </a>
              </li>
            </ul>
            <Link href="/prenota"
              className="inline-flex items-center mt-5 px-5 py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors">
              Prenota ora →
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} WASH HUB. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/cookie" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import Link from 'next/link'

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const IconTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white/70">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/brand/logo-autolavaggi.png`} alt="WASH HUB Autolavaggi"
              className="h-20 w-auto mb-3" />
            <p className="text-sm leading-relaxed">
              Artigiani del lavaggio auto a Catania dal 2022. Due sedi, una sola ossessione: la perfezione.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/washhubcatania" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors">
                <IconInstagram />
              </a>
              <a href="https://www.facebook.com/120281217832639" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors">
                <IconFacebook />
              </a>
              <a href="https://www.tiktok.com/@washhublungomare" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#F5C518] hover:text-[#F5C518] transition-colors">
                <IconTikTok />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigazione</h4>
            <ul className="space-y-2 text-sm">
              {([
                ['Home', '/'],
                ['Servizi', '/servizi'],
                ['Le nostre sedi', '/sedi'],
                ['Flotte & Aziende', '/flotte'],
                ['FAQ', '/faq'],
                ['Chi siamo', '/chi-siamo'],
                ['Gift Card', '/gift-card', 'soon'],
                ['Porta un amico', '/referral', ''],
                ['Prenota', '/prenota'],
                ['Contatti', '/contatti'],
              ] as [string, string, string?][]).map(([l, h, badge]) => (
                <li key={h} className="flex items-center gap-2">
                  <Link href={h} className="hover:text-white transition-colors">{l}</Link>
                  {badge === 'soon' && <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F5C518]/20 text-[#F5C518]">Soon</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Sedi */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Le sedi</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white font-medium">WASH HUB Lungomare</p>
                <p>Via Anfuso 35, Catania</p>
                <p>Lun–Sab 7:30–18:30</p>
              </div>
              <div>
                <p className="text-[#F5C518] font-medium">WASH HUB POP · Paesi Etnei</p>
                <p>Via Galileo Galilei 28, San Gregorio di Catania</p>
                <p>Manuale Lun–Dom 8:00–19:00</p>
                <p className="text-[#F5C518]">Self service 24/7</p>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contatti</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@washhub.it" className="hover:text-white transition-colors">
                  info@washhub.it
                </a>
              </li>
              <li>
                <a href="tel:+390954695153" className="hover:text-white transition-colors">
                  095 469 5153
                </a>
              </li>
            </ul>
            <Link href="/prenota"
              className="inline-flex items-center mt-5 px-5 py-2.5 rounded-full bg-[#F5C518] text-[#0F0F0F] text-sm font-bold hover:bg-[#E0B210] transition-colors">
              Prenota ora →
            </Link>
          </div>
        </div>

        {/* Partner */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
          <span className="text-xs text-white/30 uppercase tracking-widest shrink-0">Prodotti certificati</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="https://www.mafra.it" target="_blank" rel="noopener noreferrer">
            <img src="https://mafra.it/wp-content/uploads/2025/04/logo-60-mafra-anniversary-Since-1965-e1745477899242.png"
              alt="MA-FRA" className="h-8 w-auto opacity-50 hover:opacity-80 transition-opacity" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} WASH HUB. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/termini" className="hover:text-white/60 transition-colors">Termini e Condizioni</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

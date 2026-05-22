import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — WASH HUB',
  description: 'Informativa sul trattamento dei dati personali di WASH HUB.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-[#0F0F0F] text-white text-center">
        <h1 className="font-display text-4xl md:text-5xl font-black"
          style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
          Privacy Policy
        </h1>
        <p className="text-white/50 mt-3">Ultimo aggiornamento: maggio 2026</p>
      </section>

      <section className="py-16 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 prose prose-neutral text-[#0F0F0F]">
          <div className="space-y-8 text-sm leading-relaxed text-[#444]">

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">1. Titolare del trattamento</h2>
              <p>WASH HUB di Consoli Guido, con sede in Via Anfuso 35, Catania (CT). Email: info@parkinglungomare.it — Tel: 095 469 5153.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">2. Dati raccolti</h2>
              <p>Attraverso il modulo di prenotazione online raccogliamo: nome e cognome, numero di telefono, tipo di veicolo e targa (opzionale). I dati vengono trattati esclusivamente per la gestione delle prenotazioni.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">3. Finalità e base giuridica</h2>
              <p>I dati sono trattati per eseguire il contratto di servizio (art. 6, par. 1, lett. b, GDPR) — ovvero gestire la tua prenotazione e contattarti in caso di necessità.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">4. Conservazione</h2>
              <p>I dati sono conservati per il tempo strettamente necessario all'erogazione del servizio prenotato e per adempiere agli obblighi di legge (max 10 anni per obblighi fiscali/contabili).</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">5. Destinatari</h2>
              <p>I dati non vengono ceduti a terzi. Vengono trattati esclusivamente dal personale di WASH HUB e archiviati su Firebase (Google LLC) nell'ambito dei servizi cloud, con adeguate garanzie GDPR.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">6. I tuoi diritti</h2>
              <p>Puoi esercitare in qualsiasi momento i diritti di accesso, rettifica, cancellazione, portabilità e opposizione scrivendo a info@parkinglungomare.it. Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">7. Cookie</h2>
              <p>Questo sito non utilizza cookie di profilazione. Potrebbero essere utilizzati cookie tecnici strettamente necessari al funzionamento del sito.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini e Condizioni — WASH HUB',
  description: 'Termini e condizioni del servizio WASH HUB Catania.',
}

export default function TerminiPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-[#0F0F0F] text-white text-center">
        <h1 className="font-display text-4xl md:text-5xl font-black"
          style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
          Termini e Condizioni
        </h1>
        <p className="text-white/50 mt-3">Ultimo aggiornamento: maggio 2026</p>
      </section>

      <section className="py-16 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="space-y-8 text-sm leading-relaxed text-[#444]">

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">1. Servizio di prenotazione</h2>
              <p>La prenotazione online è un servizio offerto da WASH HUB per riservare un orario presso la sede di Via Anfuso 35, Catania. La prenotazione è soggetta alla disponibilità effettiva degli orari.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">2. Conferma e cancellazione</h2>
              <p>La prenotazione si intende confermata al momento dell'invio del modulo. In caso di impossibilità a presentarsi, ti chiediamo di avvisarci telefonicamente al 095 469 5153 con almeno 2 ore di anticipo.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">3. Prezzi</h2>
              <p>I prezzi indicati sul sito sono orientativi e possono variare in base alle condizioni del veicolo. Il prezzo definitivo viene comunicato al momento dell'accettazione del veicolo. Per la tappezzeria è richiesto un preventivo su appuntamento.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">4. Responsabilità</h2>
              <p>WASH HUB si impegna a trattare ogni veicolo con la massima cura. Non si assume responsabilità per danni preesistenti non segnalati al momento della consegna. Prima di iniziare il lavaggio viene effettuata una verifica visiva del veicolo.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">5. Abbonamenti</h2>
              <p>Gli abbonamenti mensili sono personali e non cedibili. Il rinnovo è mensile e può essere disdetto in qualsiasi momento prima del rinnovo successivo. I lavaggi non utilizzati nel mese non sono cumulabili.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">6. Orari e chiusure</h2>
              <p>Gli orari di apertura sono Lunedì–Sabato 7:30–18:30 per la sede Lungomare. WASH HUB si riserva il diritto di modificare gli orari o chiudere in occasione di festività, comunicandolo con adeguato preavviso.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">7. Foro competente</h2>
              <p>Per qualsiasi controversia è competente il Foro di Catania. Si applica la legge italiana.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

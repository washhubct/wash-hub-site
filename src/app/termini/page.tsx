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
        <p className="text-white/50 mt-3">Ultimo aggiornamento: ottobre 2026</p>
      </section>

      <section className="py-16 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="space-y-8 text-sm leading-relaxed text-[#444]">

            <div>
              <h2 className="text-lg font-bold text-[#0F0F0F] mb-2">1. Servizio di prenotazione</h2>
              <p>La prenotazione online è un servizio offerto da WASH HUB per riservare un orario presso la sede di Via Anfuso 35, Catania. La prenotazione è soggetta alla disponibilità effettiva degli orari.</p>
            </div>

            <div>
              <h2 id="prenotazioni" className="text-lg font-bold text-[#0F0F0F] mb-2 scroll-mt-28">2. Conferma, disdetta e caparra</h2>
              <p>La prenotazione si intende confermata al momento dell'invio del modulo (o del pagamento, quando richiesto). Puoi disdirla gratuitamente fino a 2 ore prima dell'orario scelto su wash-hub.it/disdici, oppure avvisandoci al 095 469 5153.</p>
              <p className="mt-2"><strong>Carta a garanzia e penale.</strong> Per le prenotazioni online ti chiediamo di salvare una carta di pagamento a garanzia, tramite Stripe: al momento della prenotazione non viene addebitato nulla. Se disdici almeno 2 ore prima non paghi niente. Se non ti presenti o disdici più tardi, ci autorizzi ad addebitare sulla carta una penale di €10 (art. 1382 c.c.). L'addebito viene fatto solo dopo la verifica della mancata presentazione da parte del nostro personale.</p>
              <p className="mt-2"><strong>Caparra.</strong> Se in passato una prenotazione associata al tuo numero di telefono non è stata rispettata senza disdetta, per le nuove prenotazioni online chiediamo una caparra confirmatoria (art. 1385 c.c.) di €10, pagata online al momento della prenotazione e scalata dal prezzo del servizio. Se disdici almeno 2 ore prima, la caparra ti viene restituita sullo stesso metodo di pagamento. Se non ti presenti o disdici più tardi, la caparra viene trattenuta. Per applicare questa regola usiamo lo storico delle prenotazioni legato al numero di telefono.</p>
              <p className="mt-2"><strong>Priority.</strong> Il supplemento Priority, pagato online, garantisce l'ingresso in lavaggio entro 10 minuti dall'arrivo all'orario scelto; se l'attesa è maggiore ti restituiamo il supplemento. Disdicendo almeno 2 ore prima, il supplemento viene rimborsato.</p>
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

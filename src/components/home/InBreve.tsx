import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MAPPE, TELEFONO, TELEFONO_HREF } from '@/lib/sedi'

const L = 'underline decoration-[#C8A84E] underline-offset-4 font-semibold text-[#0F0F0F] hover:text-[#8a7230]'

// I fatti chiave in due paragrafi di testo vero: dove siamo, orari, prezzi, telefono.
// Stessi prezzi e orari di servizi/page.tsx e delle pagine sede.
export function InBreve() {
  return (
    <section className="bg-white py-14 md:py-20">
      <AnimatedSection className="max-w-3xl mx-auto px-5 md:px-8">
        <p className="text-[#8a7230] text-xs font-bold uppercase tracking-[0.2em] mb-3">In breve</p>
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#0F0F0F] leading-tight mb-6"
          style={{ fontFamily: 'var(--font-bricolage), system-ui' }}>
          Due sedi, un modo solo di lavare: bene.
        </h2>
        <div className="space-y-4 text-[#3a3a3a] text-lg leading-relaxed">
          <p>
            WASH HUB è un autolavaggio a mano a Catania, in{' '}
            <a href={MAPPE.lungomare.scheda} target="_blank" rel="noopener noreferrer" className={L}>Via Anfuso 35 sul Lungomare</a>:
            lavaggio esterno da €14, lavaggio completo interno ed esterno da €18, Performance Intenso da €29, moto e scooter €12
            (<Link href="/servizi" className={L}>listino completo</Link>).
            Su richiesta <Link href="/servizi/sanificazione-interni" className={L}>smacchiatura e sanificazione degli interni</Link>,
            lavaggio motore, sanificazione dell&rsquo;impianto clima e tappezzeria.
            Siamo aperti dal lunedì al sabato, 8:00–18:30, con <Link href="/prenota" className={L}>prenotazione online</Link> e{' '}
            <Link href="/parcheggio-smart" className={L}>parcheggio interno</Link> a €2 l&rsquo;ora, accessibile 24 ore su 24.
          </p>
          <p>
            A San Gregorio di Catania, in Via Galileo Galilei 28, c&rsquo;è{' '}
            <Link href="/sedi/paesi-etnei" className={L}>WASH HUB POP</Link>: self service aperto 24 ore su 24 e lavaggio a mano con operatori
            (lun–sab 8:00–19:00, domenica 8:00–13:30), senza prenotazione.
            Per tutte e due le sedi il telefono è <a href={TELEFONO_HREF} className={`${L} whitespace-nowrap`}>{TELEFONO}</a>.
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}

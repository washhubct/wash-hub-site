import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { nome, email, tel, msg } = await req.json()
    if (!nome || !email || !msg) return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 })

    // TODO: sostituire con Resend/Nodemailer in produzione
    // Per ora logga e restituisce ok (configurare RESEND_API_KEY in env)
    console.log('📧 Nuovo contatto:', { nome, email, tel, msg })

    /*
    // Esempio con Resend (npm install resend):
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'sito@wash-hub.it',
      to: 'info@parkinglungomare.it',
      subject: `Nuovo messaggio da ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\nTel: ${tel}\n\n${msg}`,
    })
    */

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}

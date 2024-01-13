import { Resend } from "resend";
import { NextResponse } from "next/server";
import KiszallitvaUgyfel from "../../../../../emails/KiszallitvaUgyfel";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { nev, email } = await request.json();

  try {

  const ugyfelMail = await resend.emails.send({
    from: 'PEBo Étterem <hello@admin.peboetterem.hu>',
    to: email,
    subject: 'Rendelésed már a futárnál van',
    react: KiszallitvaUgyfel({
        nev
    })
  });

  return NextResponse.json({ ugyfelMail },{ status:200 })
  } catch(e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json({
      error: 'Internal server error.'
    }, {
      status: 500
    })
  }
}
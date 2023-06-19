import { getEnv } from '@/utils/env';
import { NextRequest, NextResponse } from 'next/server';

const mail = require('@sendgrid/mail');
mail.setApiKey(getEnv('SENDGRID_API_KEY'));

export async function POST(req: NextRequest) {
  const body = await req.json();

  const message = {
    to: body.mail,
    from: 'biuro@gancle-studio.pl', // Change to your verified sender
    subject: 'Password Reset',
    text: '',
    html: body.link
  };

  console.log(message);

  mail
    .send(message)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: Error) => {
      console.error(error);
    });

  return NextResponse.json({ status: 200 });
}

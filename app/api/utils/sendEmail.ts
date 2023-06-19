import { getEnv } from '@/utils/env';

const mail = require('@sendgrid/mail');
mail.setApiKey(getEnv('SENDGRID_API_KEY'));

export const sendEmail = async (email: string, link: string) => {
  const message = {
    to: email,
    from: 'biuro@gancle-studio.pl',
    subject: 'Password Reset',
    text: 'lala',
    html: link
  };

  await mail
    .send(message)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: Error) => {
      console.error(error);
      console.log('zesralo sie');
    });

  return message;
};

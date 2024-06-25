import * as sgMail from '@sendgrid/mail';

export const sendVerificationEmail = async (email: string, token: string) => {
  const sendgridApiKey = process.env.SENDGRID_API_KEY as string;
  const appUrl = process.env.APP_URL as string;
  const emailSender = process.env.VERIFIED_EMAIL_SENDER as string;
  const confirmationLink = `${appUrl}/auth/verification?token=${token}`;
  const message = `<p>Click <a href="${confirmationLink}">here</a> to confirm email.</p>`;

  sgMail.setApiKey(sendgridApiKey);

  const msg = {
    to: email,
    from: emailSender,
    subject: 'Confirm your email',
    html: message,
  };

  await sgMail.send(msg);
};

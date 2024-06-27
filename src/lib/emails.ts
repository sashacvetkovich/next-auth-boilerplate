import * as sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY as string;
const appUrl = process.env.APP_URL as string;
const emailSender = process.env.VERIFIED_EMAIL_SENDER as string;

export const sendVerificationEmail = async (email: string, token: string) => {
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

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${appUrl}/auth/new-password?token=${token}`;
  const message = `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`;

  sgMail.setApiKey(sendgridApiKey);

  const msg = {
    to: email,
    from: emailSender,
    subject: 'Reset your password',
    html: message,
  };

  await sgMail.send(msg);
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

  sgMail.setApiKey(sendgridApiKey);

  const msg = {
    to: email,
    from: emailSender,
    subject: '2FA Token',
    html: `<p>Your 2FA token is ${token}</p>`,
  };

  await sgMail.send(msg);
};

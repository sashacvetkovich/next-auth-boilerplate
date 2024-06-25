import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from '../data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/reset-password';
import { db } from '@/lib/db';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const oneHour = 3600 * 1000;
  const expires = new Date(new Date().getTime() + oneHour);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const oneHour = 3600 * 1000;
  const expires = new Date(new Date().getTime() + oneHour);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

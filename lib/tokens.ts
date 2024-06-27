import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from '../data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/reset-password';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const tenMinutes = 10 * 60 * 1000;

  const expires = new Date(new Date().getTime() + tenMinutes);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from './verification-token';
import { db } from '@/lib/db';

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

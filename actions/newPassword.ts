'use server';

import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/reset-password';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const updatePassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Invalid token' };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid password!' };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Invalid token' };
  }

  const tokenHasExpired = new Date(existingToken.expires) < new Date();

  if (tokenHasExpired) {
    return { error: 'Invalid token' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Invalid token' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Password updated' };
};

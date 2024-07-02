'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/emails';
import bcrypt from 'bcryptjs';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await getCurrentUser();

  if (!user) {
    return { error: 'Not authorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Not authorized' };
  }

  if (!user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
      return { error: 'Email is already in use' };
    }

    const verfificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verfificationToken.email,
      verfificationToken.token
    );

    return { success: 'Verification email sent' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: 'Invalid password' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated' };
};

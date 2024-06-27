'use server';

import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { ResetSchema } from '@/schemas';
import { sendPasswordResetEmail } from '@/lib/emails';
import { generatePasswordResetToken } from '@/lib/tokens';

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Invalid email' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};

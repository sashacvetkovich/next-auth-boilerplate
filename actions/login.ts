'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);

    return {
      success: 'A confirmation email has been sent to your email address',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 'Successfully logged in!' };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials!' };
      }

      return { error: 'Something went wrong!' };
    }

    throw error;
  }
};

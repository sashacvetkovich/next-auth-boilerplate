import { GitHub } from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import NextAuth, { type DefaultSession } from 'next-auth';
import { UserRole } from '@prisma/client';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

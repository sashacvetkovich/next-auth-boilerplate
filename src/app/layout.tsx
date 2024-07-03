import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
// Server actions
import { auth } from '@/auth';
// Components
import Navbar from '@/components/Navbar/Navbar';
// Styles
import './globals.css';
// Google fonts
import { DM_Sans } from 'next/font/google';
const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={dmSans.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}

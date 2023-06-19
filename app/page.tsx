'use client';
import SignInForm from '@/components/SignInForm';
import { SessionProvider } from 'next-auth/react';

export default function Home() {
  return (
    <>
      <SessionProvider>
        <SignInForm />
      </SessionProvider>
    </>
  );
}

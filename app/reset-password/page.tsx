'use client';

import { changePassword } from '@/fetches/changePassword';
import { generateResetPasswordToken } from '@/fetches/resetPassword';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

const ForgotPasswordPage = () => {
  const { data, status, update } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const { email } = target;

    if (status === 'authenticated') {
      throw new Error('Jestes zalogowany cwelu');
    } else {
      await generateResetPasswordToken(email.value);
    }

    return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Wpisz swoj email</label>
        <input type='email' name='email' />

        <button type='submit'>zresetuj haslo</button>
      </form>
    </>
  );
};

export default ForgotPasswordPage;

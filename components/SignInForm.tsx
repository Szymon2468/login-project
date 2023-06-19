'use client';

import { changePassword } from '@/fetches/changePassword';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

const SignInForm = () => {
  const { data, status, update } = useSession();

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const { email, password } = target;
    const response = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: true
    });

    console.log(response);

    if (response?.error) {
      console.error(response.error);
    } else {
      console.log('jestem');
      router.replace('/settings');
    }
  };

  console.log(status);
  return (
    <>
      {status === 'loading' && <h3>loading...</h3>}

      {status === 'authenticated' && (
        <>
          {' '}
          <p>hello {data.user ? data.user.name : ''}</p>{' '}
          <button
            onClick={() => {
              router.replace('/');
              signOut();
            }}
          >
            Log out
          </button>
        </>
      )}

      {status != 'authenticated' && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email:</label>
            <input id='email' type='email' name='email' />

            <label htmlFor='password'>Password:</label>
            <input id='password' type='password' name='password' />

            <button type='submit'>Submit</button>
          </form>
          <p>Nie jestes zalogowany</p>
        </>
      )}
    </>
  );
};

export default SignInForm;

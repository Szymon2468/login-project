'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoggedUserPage = async () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status != 'authenticated') {
    return null;
  } else if (data) {
    return (
      <>
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
    );
  }
};

export default LoggedUserPage;

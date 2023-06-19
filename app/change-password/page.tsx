'use client';

import { changePassword } from '@/fetches/changePassword';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

const ChangePasswordPage = () => {
  const { data, status, update } = useSession();
  const router = useRouter();
  // const [arePasswordsEqualErrorVisible, setArePasswordsEqualErrorVisible] =
  //   useState<boolean>(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (status === 'authenticated') {
      const target = e.target as typeof e.target & {
        firstNewPassword: { value: string };
        secondNewPassword: { value: string };
        oldPassword: { value: string };
      };

      const { firstNewPassword, secondNewPassword, oldPassword } = target;

      if (firstNewPassword.value != secondNewPassword.value) {
        // setArePasswordsEqualErrorVisible(true);clg
        console.log('sie nie zgadzaja hasla');
      } else {
        // setArePasswordsEqualErrorVisible(false);
        await changePassword(firstNewPassword.value, oldPassword.value);
        router.replace('/');
        console.log('zmiana hasla powiodla sie');
      }
    } else {
      throw new Error('Zaloguj sie cwelu');
    }

    return;
  };
  if (status != 'authenticated') {
    return <p>Nie jestes zalogowany</p>;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor='oldPassword'>Wpisz stare haslo</label>
          <input type='password' name='oldPassword' />

          <label htmlFor='firstNewPassword'>Podaj nowe haslo</label>
          <input type='password' name='firstNewPassword' />

          <label htmlFor='secondNewPassword'>
            Podaj nowe haslo jeszcze raz
          </label>
          <input type='password' name='secondNewPassword' />
          {/* {arePasswordsEqualErrorVisible && <p>Nowe hasla musza sie zgadzac</p>} */}
          <button type='submit'>zmien haslo</button>
        </form>
      </>
    );
  }
};

export default ChangePasswordPage;

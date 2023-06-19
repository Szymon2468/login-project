'use client';

import { addNewUser } from '@/fetches/addNewUser';
import { newUserSchema } from '@/yup/newUserSchema';
import { useState } from 'react';

const RegisterPage = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setErrorMsg('');

      const data = {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      };

      await addNewUser(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <form action='submit' onSubmit={async (e) => handleSubmit(e)}>
        <label htmlFor='name'>Name:</label>
        <input type='text' name='name' />

        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' />

        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' />

        <button type='submit'>Submit</button>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </>
  );
};

export default RegisterPage;

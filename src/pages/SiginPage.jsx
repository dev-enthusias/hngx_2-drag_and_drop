import React from 'react';
import { Form, useActionData, redirect } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';

export async function action({ request }) {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
    })
    .catch(error => {
      if (error.message === 'Firebase: Error (auth/invalid-email).')
        error.message = 'Invalid email';

      if (error.message === 'Firebase: Error (auth/missing-password)')
        error.message = 'Please input your password';

      if (error.message === 'Firebase: Error (auth/invalid-login-credentials).')
        error.message = 'Wrong login credentials';

      return error.message;
    });

  return redirect('/');
}

export default function SiginPage() {
  const message = useActionData();

  return (
    <div className='h-screen flex items-center justify-center px-5'>
      <Form method='post' replace className='sm:border w-full max-w-lg'>
        <h1 className='text-center text-2xl font-bold mb-5'>Sign In</h1>

        {message && (
          <h4 className='text-center text-red-500 font-semibold'>{message}</h4>
        )}

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className='bg-slate-200 w-full rounded-md px-4 py-2 mb-2 focus:outline-none focus:bg-blue-100'
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            className='bg-slate-200 w-full rounded-md px-4 py-2 mb-4 focus:outline-none focus:bg-blue-100'
          />
        </div>
        <div className='text-center'>
          <button className='bg-pink-800 rounded-md px-4 py-1 text-white'>
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
}

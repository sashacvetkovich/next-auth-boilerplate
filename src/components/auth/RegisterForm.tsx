'use client';
import { useState, useTransition } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';
// Server actions
import { register } from '@/actions/register';

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const handleSubmitForm = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        setErrorMessage(data?.error || '');
        setSuccessMessage(data?.success || '');
      });
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            {...form.register('email')}
            placeholder='example@mail.com'
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            {...form.register('password')}
            placeholder='******'
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='name'
            type='text'
            {...form.register('name')}
            placeholder='John Doe'
            disabled={isLoading}
          />
        </div>
        <AuthSuccessMessage message={successMessage} />
        <AuthErrorMessage message={errorMessage} />
        <button type='submit' disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

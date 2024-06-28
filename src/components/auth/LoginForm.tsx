'use client';
import { useState, useTransition } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';

import AuthSuccessMessage from './AuthSuccessMessage';
import AuthErrorMessage from './AuthErrorMessage';
import { useSearchParams } from 'next/navigation';
import { login } from '@/actions/login';
import TextInput from '../inputs/TextInput/TextInput';
import PasswordInput from '../inputs/PasswordInput/PasswordInput';
import Button from '../shared/Button/Button';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const isNotLinkedErrorVisible =
    searchParams.get('error') === 'OAuthAccountNotLinked';
  const notLinkedErrorMessage = isNotLinkedErrorVisible
    ? 'Email is already in use with a different provider!'
    : '';
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isTwoFactorVisible, setIsTwoFactorVisible] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitForm = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setErrorMessage(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccessMessage(data.success);
          }

          if (data?.twoFactor) {
            setIsTwoFactorVisible(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Something went wrong');
        });
    });
  };

  return (
    <form className='min-w-96' onSubmit={form.handleSubmit(handleSubmitForm)}>
      {isTwoFactorVisible && (
        <div>
          <label htmlFor='code'>Two Factor Code</label>
          <input
            id='code'
            type='text'
            {...form.register('code')}
            placeholder='12345'
            disabled={isLoading}
          />
        </div>
      )}
      {!isTwoFactorVisible && (
        <div className='space-y-4'>
          <TextInput
            id='email'
            label='Email'
            type='email'
            placeholder='example@mail.com'
            form={form}
            isDisabled={isLoading}
          />
          <PasswordInput
            id='password'
            label='Password'
            placeholder='******'
            isDisabled={isLoading}
            form={form}
          />
        </div>
      )}
      <AuthSuccessMessage message={successMessage} />
      <AuthErrorMessage message={errorMessage || notLinkedErrorMessage} />
      <Button
        text={isTwoFactorVisible ? 'Confirm' : 'Log in'}
        isDisabled={isLoading}
      />
    </form>
  );
};

export default LoginForm;

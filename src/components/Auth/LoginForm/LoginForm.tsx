'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
// Schemas
import { LoginSchema } from '@/schemas';
// Server actions
import { login } from '@/actions/login';
// Components
import TextInput from '../../Inputs/TextInput/TextInput';
import PasswordInput from '../../Inputs/PasswordInput/PasswordInput';
import Button from '../../shared/Button/Button';
import InfoMessage from '../../shared/InfoMessage/InfoMessage';
// Utils
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
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
  const {
    formState: { errors },
  } = form;

  const handleSubmitForm = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
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
    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
      {isTwoFactorVisible && (
        <TextInput
          id='code'
          label='Two Factor Code<'
          type='code'
          placeholder='123456'
          form={form.register('code')}
          isDisabled={isLoading}
        />
      )}
      {!isTwoFactorVisible && (
        <div className='space-y-4'>
          <TextInput
            id='email'
            label='Email'
            type='email'
            placeholder='example@mail.com'
            form={form.register('email')}
            isDisabled={isLoading}
            errorMessage={errors.email?.message}
          />
          <PasswordInput
            id='password'
            label='Password'
            placeholder='******'
            isDisabled={isLoading}
            form={form.register('password')}
            errorMessage={errors.password?.message}
          />
        </div>
      )}

      <InfoMessage text={successMessage} type='success' />
      <InfoMessage text={errorMessage || notLinkedErrorMessage} type='error' />

      <Button
        type='full'
        text={isTwoFactorVisible ? 'Confirm' : 'Log in'}
        isDisabled={isLoading}
      />
    </form>
  );
};

export default LoginForm;

'use client';
import React, { useState, useTransition } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import AuthWrapper from '@/components/auth/AuthWrapper';
import { Button } from '../ui/button';
// Server actions
import { login } from '@/actions/login';
import AuthSuccessMessage from './AuthSuccessMessage';
import AuthErrorMessage from './AuthErrorMessage';
import { useSearchParams } from 'next/navigation';

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
          console.log(err)
          setErrorMessage('Something went wrong')
        });
    });
  };

  return (
    <AuthWrapper headerLabel='Log in' showSocial>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitForm)}>
            {isTwoFactorVisible ? (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='12345'
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='example@mail.com'
                          type='email'
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='******'
                          type='password'
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <AuthSuccessMessage message={successMessage} />
            <AuthErrorMessage message={errorMessage || notLinkedErrorMessage} />
            <Button type='submit' disabled={isLoading}>
              {isTwoFactorVisible ? "Confirm" : "Log in"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default LoginForm;

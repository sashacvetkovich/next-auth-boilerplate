'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSearchParams } from 'next/navigation';

import { NewPasswordSchema } from '@/schemas';
import AuthSuccessMessage from './AuthSuccessMessage';
import AuthErrorMessage from './AuthErrorMessage';
import { updatePassword } from '@/actions/newPassword';

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      updatePassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              {...form.register('password')}
              placeholder='******'
              disabled={isPending}
            />
          </div>
        </div>
        <AuthErrorMessage message={error} />
        <AuthSuccessMessage message={success} />
        <button disabled={isPending} type='submit' className='w-full'>
          Update password{' '}
        </button>
      </form>
    </div>
  );
};

export default NewPasswordForm;

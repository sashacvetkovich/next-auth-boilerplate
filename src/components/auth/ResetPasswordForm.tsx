'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetSchema } from '@/schemas';
// import { CardWrapper } from "@/components/auth/card-wrapper"
import AuthSuccessMessage from './AuthSuccessMessage';
import AuthErrorMessage from './AuthErrorMessage';
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
import { resetPassword } from '@/actions/reset';

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(values).then((data) => {
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
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              {...form.register('email')}
              placeholder='example@mail.com'
              disabled={isPending}
            />
          </div>
        </div>
        <AuthErrorMessage message={error} />
        <AuthSuccessMessage message={success} />
        <button disabled={isPending} type='submit' className='w-full'>
          Send reset email
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

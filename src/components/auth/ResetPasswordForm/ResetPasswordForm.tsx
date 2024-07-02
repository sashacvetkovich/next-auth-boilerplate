'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetSchema } from '@/schemas';
import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';
import { resetPassword } from '@/actions/reset';
import Button from '@/components/shared/Button/Button';
import TextInput from '@/components/inputs/TextInput/TextInput';

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

  const {
    formState: { errors },
  } = form;

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
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
      <TextInput
        id='email'
        label='Email'
        placeholder='example@mail.com'
        type='email'
        isDisabled={isPending}
        form={form.register('email')}
        errorMessage={errors.email?.message}
      />

      <InfoMessage text={error || ''} type='error' />
      <InfoMessage text={success || ''} type='success' />

      <Button text='Send reset email' isDisabled={isPending} />
    </form>
  );
};

export default ResetPasswordForm;

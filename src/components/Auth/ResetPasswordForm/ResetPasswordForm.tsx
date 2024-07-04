'use client';

// Hooks
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
// Server actions
import { resetPassword } from '@/actions/reset';
// Schemas
import { ResetSchema } from '@/schemas';
// Components
import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';
import Button from '@/components/shared/Button/Button';
import TextInput from '@/components/Inputs/TextInput/TextInput';
// Utils
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

      <Button
        type='primary'
        text='Send reset email'
        isDisabled={isPending}
        additionalStyles='w-full'
      />
    </form>
  );
};

export default ResetPasswordForm;

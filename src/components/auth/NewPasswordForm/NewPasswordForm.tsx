'use client';
// Hooks
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
// Schemas
import { NewPasswordSchema } from '@/schemas';
// Server actions
import { updatePassword } from '@/actions/newPassword';
// Components
import InfoMessage from '../../shared/InfoMessage/InfoMessage';
import Button from '../../shared/Button/Button';
import PasswordInput from '../../inputs/PasswordInput/PasswordInput';
// Utils
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

  const {
    formState: { errors },
  } = form;

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
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
      <PasswordInput
        id='password'
        label='******'
        placeholder='Password'
        isDisabled={isPending}
        form={form.register('password')}
        errorMessage={errors.password?.message}
        showPasswordStrengthBox
      />
      <InfoMessage text={error || ''} type='error' />
      <InfoMessage text={success || ''} type='success' />
      <Button type='full' text='Update password' isDisabled={isPending} />
    </form>
  );
};

export default NewPasswordForm;

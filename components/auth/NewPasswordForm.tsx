'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSearchParams } from 'next/navigation';

import { NewPasswordSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <AuthErrorMessage message={error} />
          <AuthSuccessMessage message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Update password{' '}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPasswordForm;

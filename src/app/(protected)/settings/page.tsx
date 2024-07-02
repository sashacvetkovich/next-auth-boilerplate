'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SettingsSchema } from '@/schemas';
import { settings } from '@/actions/settings';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import TextInput from '@/components/inputs/TextInput/TextInput';
import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';
import PasswordInput from '@/components/inputs/PasswordInput/PasswordInput';
import Button from '@/components/shared/Button/Button';
import Toggle from '@/components/shared/Toggle/Toggle';

const SettingsPage = () => {
  const user = useCurrentUser();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);
          }

          if (data.success) {
            update();
            setSuccessMessage(data.success);
          }
        })
        .catch(() => setErrorMessage('Something went wrong!'));
    });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold text-center'>Settings</h1>
      <form
        className='space-y-6 max-w-[500px] mx-auto'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='space-y-4'>
          <TextInput
            id='name'
            label='Name'
            type='name'
            form={form.register('name')}
            placeholder=''
            isDisabled={isPending}
          />

          {user?.isOAuth === false && (
            <>
              <TextInput
                id='email'
                label='Email'
                type='email'
                placeholder=''
                form={form.register('email')}
                isDisabled={isPending}
                errorMessage={errors.email?.message}
              />
              <PasswordInput
                id='password'
                label='Current Password'
                placeholder=''
                form={form.register('password')}
                isDisabled={isPending}
                errorMessage={errors.password?.message}
              />
              <PasswordInput
                id='newPassword'
                label='New Password'
                placeholder=''
                form={form.register('newPassword')}
                isDisabled={isPending}
                errorMessage={errors.newPassword?.message}
              />
            </>
          )}
          {user?.isOAuth === false && (
            <div className='flex items-center justify-between'>
              <p>Two Factor Authentication</p>
              <Toggle
                isDisabled={isPending}
                form={form.register('isTwoFactorEnabled')}
                isChecked={user?.isTwoFactorEnabled}
              />
            </div>
          )}
        </div>

        <InfoMessage text={errorMessage || ''} type='error' />
        <InfoMessage text={successMessage || ''} type='success' />

        <Button isDisabled={isPending} text='Save' />
      </form>
    </div>
  );
};

export default SettingsPage;

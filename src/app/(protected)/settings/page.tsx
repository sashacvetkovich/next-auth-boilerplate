'use client';

// Server actions
import { settings } from '@/actions/settings';
// Hooks
import { useForm } from 'react-hook-form';
import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
// Schemas
import { SettingsSchema } from '@/schemas';
// Components
import TextInput from '@/components/Inputs/TextInput/TextInput';
import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';
import PasswordInput from '@/components/Inputs/PasswordInput/PasswordInput';
import Button from '@/components/shared/Button/Button';
import Toggle from '@/components/shared/Toggle/Toggle';
// Utils
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    <div className='mt-10'>
      <h1 className='text-2xl font-semibold text-center text-heading'>
        Settings
      </h1>
      <form
        className='space-y-6 max-w-[500px] mx-auto px-5'
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
              <p className='text-primary-900'>Two Factor Authentication</p>
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

        <Button
          type='primary'
          isDisabled={isPending}
          text='Save'
          additionalStyles='w-full'
        />
      </form>
    </div>
  );
};

export default SettingsPage;

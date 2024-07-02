'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
// Schemas
import { RegisterSchema } from '@/schemas';
// Components
import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';
import PasswordInput from '@/components/inputs/PasswordInput/PasswordInput';
// Server actions
import { register } from '@/actions/register';
import Button from '@/components/shared/Button/Button';
import TextInput from '@/components/inputs/TextInput/TextInput';
// Utils
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const {
    formState: { errors },
  } = form;

  const handleSubmitForm = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        setErrorMessage(data?.error || '');
        setSuccessMessage(data?.success || '');
      });
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <div className='space-y-4'>
          <TextInput
            id='name'
            type='name'
            placeholder='John Doe'
            isDisabled={isLoading}
            label='Name'
            form={form.register('name')}
            errorMessage={errors.name?.message}
          />
          <TextInput
            id='email'
            type='email'
            placeholder='example@mail.com'
            isDisabled={isLoading}
            label='Email'
            form={form.register('email')}
            errorMessage={errors.email?.message}
          />
          <PasswordInput
            id='password'
            placeholder='********'
            isDisabled={isLoading}
            label='Password'
            form={form.register('password')}
            errorMessage={errors.password?.message}
            showPasswordStrengthBox
          />
          <InfoMessage text={successMessage} type='success' />
          <InfoMessage text={errorMessage} type='error' />
          <Button text='Register' isDisabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

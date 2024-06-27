'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { checkVerificationToken } from '@/actions/verification';
import AuthSuccessMessage from './AuthSuccessMessage';
import AuthErrorMessage from './AuthErrorMessage';

const VerificationForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleTokenValidation = async () => {
    if (!token) {
      setErrorMessage('Verification link is not valid');
      return;
    }

    const result = await checkVerificationToken(token);

    if (result.success) {
      setSuccessMessage(result.success);
    }
    if (result.error) {
      setErrorMessage(result.error);
    }
  };

  useEffect(() => {
    handleTokenValidation();
  }, []);

  return (
    <div>
      VerificationForm
      {!successMessage && !errorMessage ? 'Loading' : null}
      <AuthSuccessMessage message={successMessage} />
      <AuthErrorMessage message={errorMessage} />
    </div>
  );
};

export default VerificationForm;

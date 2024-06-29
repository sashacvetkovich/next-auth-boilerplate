'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { checkVerificationToken } from '@/actions/verification';
import InfoMessage from '../../shared/InfoMessage/InfoMessage';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';

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
    <div className='sm:min-w-96'>
      {!successMessage && !errorMessage ? (
        <LoadingSpinner size='lg' className='mt-4' />
      ) : null}

      <InfoMessage text={successMessage || ''} type='success' />
      <InfoMessage text={errorMessage || ''} type='error' />
    </div>
  );
};

export default VerificationForm;

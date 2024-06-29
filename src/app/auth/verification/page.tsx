import { Suspense } from 'react';
import VerificationForm from '@/components/auth/VerificationForm/VerificationForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';

const VerificationPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
      <AuthWrap
        title='Update Your Password'
        descripiton='Enter your new password to securely update your account credentials.'
      >
        <VerificationForm />
      </AuthWrap>
    </Suspense>
  );
};

export default VerificationPage;

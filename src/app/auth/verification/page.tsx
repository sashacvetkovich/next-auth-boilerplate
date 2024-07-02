import { Suspense } from 'react';
import VerificationForm from '@/components/auth/VerificationForm/VerificationForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';

const VerificationPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
      <AuthWrap title='Email Confirmation' descripiton=''>
        <VerificationForm />
      </AuthWrap>
    </Suspense>
  );
};

export default VerificationPage;

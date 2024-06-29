import { Suspense } from 'react';
import NewPasswordForm from '@/components/auth/NewPasswordForm/NewPasswordForm';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
      <AuthWrap
        title='Update Your Password'
        descripiton='Enter and confirm your new password to securely update your account credentials.'
      >
        <NewPasswordForm />
      </AuthWrap>
    </Suspense>
  );
};

export default NewPasswordPage;

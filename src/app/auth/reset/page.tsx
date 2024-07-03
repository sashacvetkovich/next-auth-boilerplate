import { Suspense } from 'react';
import AuthWrap from '@/components/Auth/AuthWrap/AuthWrap';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm/ResetPasswordForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
        <AuthWrap
          title='Reset'
          descripiton='Enter your email to receive a link to reset your password'
        >
          <ResetPasswordForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;

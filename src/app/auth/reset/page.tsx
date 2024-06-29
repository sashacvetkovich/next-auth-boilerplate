import { Suspense } from 'react';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm/ResetPasswordForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
        <AuthWrap
          title='Register'
          descripiton='Join us today and unlock exclusive features'
          showSocialLogin
        >
          <ResetPasswordForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;

import { Suspense } from 'react';
// Components
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';

const LoginPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className='flex justify-center mt-10'>
            <LoadingSpinner />
          </div>
        }
      >
        <AuthWrap
          title='Login'
          descripiton='Login to your account'
          showSocialLogin
        >
          <LoginForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default LoginPage;

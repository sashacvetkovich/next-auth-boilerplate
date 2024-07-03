import { Suspense } from 'react';
// Components
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import AuthWrap from '@/components/Auth/AuthWrap/AuthWrap';

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
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

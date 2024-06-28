import { Suspense } from 'react';
import AuthWrap from '@/components/auth/AuthWrap/AuthWrap';
import RegisterForm from '@/components/auth/RegisterForm/RegisterForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const RegisterPage = () => {
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
          title='Register'
          descripiton='Join us today and unlock exclusive features'
          showSocialLogin
        >
          <RegisterForm />
        </AuthWrap>
      </Suspense>
    </div>
  );
};

export default RegisterPage;

import { Suspense } from 'react';
import AuthWrap from '@/components/Auth/AuthWrap/AuthWrap';
import RegisterForm from '@/components/Auth/RegisterForm/RegisterForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const RegisterPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size='lg' className='mt-10' />}>
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

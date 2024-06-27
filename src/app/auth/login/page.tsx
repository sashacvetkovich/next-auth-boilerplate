import { Suspense } from 'react';
// Components
import LoginForm from '@/components/auth/LoginForm';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

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
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;

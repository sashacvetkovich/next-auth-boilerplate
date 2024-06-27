import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;

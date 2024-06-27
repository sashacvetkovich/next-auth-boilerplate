import NewPasswordForm from '@/components/auth/NewPasswordForm';
import { Suspense } from 'react';

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />;
    </Suspense>
  );
};

export default NewPasswordPage;

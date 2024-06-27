import { Suspense } from 'react';
import VerificationForm from '@/components/auth/VerificationForm';

const VerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationForm />;
    </Suspense>
  );
};

export default VerificationPage;

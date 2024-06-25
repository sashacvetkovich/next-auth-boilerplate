'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';

const SocialLogin = () => {
  const handleSocialLogin = (provider: 'google' | 'github' | 'facebook') => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div>
      <p onClick={() => handleSocialLogin('google')}>Google</p>
      <p onClick={() => handleSocialLogin('github')}>Github</p>
      <p onClick={() => handleSocialLogin('facebook')}>Facebook</p>
    </div>
  );
};

export default SocialLogin;

'use client';
import Image from 'next/image';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
// Server actions
import { signIn } from 'next-auth/react';
// Icons
import faceBookIcon from '@/assets/facebook-icon.svg';
import googleIcon from '@/assets/google-icon.svg';
import githubIcon from '@/assets/github-icon.svg';

const SocialLogin = () => {
  const handleSocialLogin = (provider: 'google' | 'github' | 'facebook') => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className=''>
      <div className='flex items-center justify-center my-7'>
        <hr className='w-full h-px bg-gray-200 border-0' />
        <p className='text-slate-700 mx-4'>or</p>
        <hr className='w-full h-px bg-gray-200 border-0' />
      </div>
      <div className='space-y-4 mt-4'>
        <div
          onClick={() => handleSocialLogin('google')}
          className='flex items-center justify-center gap-2 border border-slate-700 rounded-full px-2 py-2 cursor-pointer'
        >
          <Image src={googleIcon} width={20} alt='facebook-icon' />
          <p className='text-slate-800 text-sm'>Continue with Google</p>
        </div>
        <div
          onClick={() => handleSocialLogin('facebook')}
          className='flex items-center justify-center gap-2 border border-slate-700 rounded-full px-2 py-2 cursor-pointer'
        >
          <Image src={faceBookIcon} width={20} alt='facebook-icon' />
          <p className='text-slate-800 text-sm'>Continue with Facebook</p>
        </div>
        <div
          onClick={() => handleSocialLogin('github')}
          className='flex items-center justify-center gap-2 border border-slate-700 rounded-full px-2 py-2 cursor-pointer'
        > 
          <Image src={githubIcon} width={20} alt='facebook-icon' />
          <p className='text-slate-800 text-sm'>Continue with GitHub</p>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;

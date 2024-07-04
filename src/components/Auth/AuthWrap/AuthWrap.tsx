import SocialLogin from '../SocialLogin/SocialLogin';

interface AuthWrapProps {
  children: React.ReactNode;
  title: string;
  descripiton: string;
  showSocialLogin?: boolean;
}

const AuthWrap = ({
  children,
  title,
  descripiton,
  showSocialLogin,
}: AuthWrapProps) => {
  return (
    <div className='flex justify-center items-center flex-col mt-10'>
      <div className='border border-primary-400 py-10 px-8 rounded-2xl shadow-lg bg-white max-w-[385px]'>
        <h1 className='text-heading text-3xl text-center mb-4'>{title}</h1>
        <p className='text-heading text-center text-lg mb-4 max-w-64 mx-auto'>
          {descripiton}
        </p>
        <div className='sm:min-w-80'>{children}</div>
        {showSocialLogin && <SocialLogin />}
      </div>
    </div>
  );
};

export default AuthWrap;

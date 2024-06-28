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
      <div className='border py-10 px-8 rounded-2xl shadow-lg bg-white'>
        <h1 className='text-slate-900 text-3xl text-center mb-2'>{title}</h1>
        <p className='text-slate-800 text-center text-lg mb-4'>{descripiton}</p>
        {children}
        {showSocialLogin && <SocialLogin />}
      </div>
    </div>
  );
};

export default AuthWrap;

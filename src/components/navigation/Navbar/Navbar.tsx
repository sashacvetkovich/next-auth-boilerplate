import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/shared/Button/Button';
import logoIcon from '../../../assets/images/logo.svg';

const Navbar = () => {
  return (
    <nav className='shadow-sm'>
      <div className='flex items-center justify-between py-5 mx-auto px-5 sm:px-10 container'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image src={logoIcon} alt='logo' height={25} />
          </div>
        </Link>
        <div className='flex space-x-8 items-center'>
          <Link href='/auth/login' className='text-primary-900'>
            Login
          </Link>
          <Link href='/auth/register'>
            <Button type='primary' text='Get started' />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

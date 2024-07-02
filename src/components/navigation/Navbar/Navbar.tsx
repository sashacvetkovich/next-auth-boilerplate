import Button from '@/components/shared/Button/Button';
import Link from 'next/link';
import Image from 'next/image';
import logoIcon from '../../../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className='px-5 shadow-sm'>
      <div className='flex items-center justify-between py-5 container mx-auto'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image src={logoIcon} alt='logo' height={25} />
            {/* <p className='font-bold text-2xl text-primary-900'>auth</p> */}
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

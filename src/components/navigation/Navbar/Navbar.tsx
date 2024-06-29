import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='px-5 border-b shadow-sm'>
      <div className='flex items-center justify-between py-6 container mx-auto'>
        <Link href='/'>
          <p className='font-bold text-2xl'>Logo</p>
        </Link>
        <div className='flex space-x-4'>
          <Link href='/auth/login'>Login</Link>
          <Link href='/auth/register'>Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

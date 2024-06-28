import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='px-5 border-b shadow-sm'>
      <div className='flex items-center justify-between py-6 container mx-auto'>
        <p className='font-bold text-2xl'>Logo</p>
        <div className='flex space-x-4'>
          <Link href='/'>Admin</Link>
          <Link href='/'>Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

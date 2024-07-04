'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { logout } from '@/actions/logout';

const Avatar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useCurrentUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const generateInitials = () => {
    if (!user?.name) return 'UN';
    const name = user.name.split(' ');

    if (name.length === 1) {
      return name[0].slice(0, 2);
    }

    return `${name[0][0]}${name[1][0]}`;
  };

  useEffect(() => {
    let handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className='relative' ref={ref}>
      <div
        onClick={toggleDropdown}
        className='w-11 h-11 rounded-full overflow-hidden cursor-pointer outline outline-1 outline-primary-300'
      >
        {user?.image ? (
          <Image
            objectFit='contain'
            width={150}
            height={150}
            src={user.image}
            alt='User dropdown'
          />
        ) : (
          <div className='flex items-center justify-center uppercase rounded-full border-2 w-11 h-11 select-none'>
            <p className='text-md text-slate-700'>{generateInitials()}</p>
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div className='absolute top-14 -right-2 z-10 bg-white divide-y divide-primary-300 rounded-lg border border-1-primary-100 shadow-lg min-w-44'>
          <div className='px-4 py-3 text-sm text-primary-900'>
            <p>{user?.name}</p>
            {user?.email ? (
              <p className='font-medium truncate'>{user.email}</p>
            ) : null}
          </div>
          <ul className='text-sm text-primary-900'>
            <li>
              <Link href='/settings'>
                <p className='block px-4 py-2 hover:bg-primary-300'>Settings</p>
              </Link>
            </li>
          </ul>
          <div onClick={() => logout()}>
            <p className='block px-4 py-2 text-sm text-primary-900 hover:bg-primary-300 cursor-pointer'>
              Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

import React from 'react';

interface ButtonProps {
  text: string;
  isDisabled: boolean;
}

const Button = ({ isDisabled, text }: ButtonProps) => {
  return (
    <button
      className='bg-slate-900 text-white px-2 py-2.5 w-full mt-4 rounded-md disabled:opacity-80'
      type='submit'
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;

import React from 'react';
// Icons
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

interface InfoMessageProps {
  text: string;
  type: 'error' | 'success';
}

const InfoMessage = ({ text, type }: InfoMessageProps) => {
  if (!text) return null;

  return (
    <div
      className={`w-full flex items-center p-2 rounded-md mt-2 border ${
        type === 'success'
          ? 'border-green-200 bg-green-100'
          : 'border-red-200 bg-red-200'
      }  `}
    >
      {type === 'error' ? (
        <FaTimesCircle className='text-rose-500' />
      ) : (
        <FaCheckCircle className='text-green-500' />
      )}
      <p className='ml-2 text-sm text-primary-900'>{text}</p>
    </div>
  );
};

export default InfoMessage;

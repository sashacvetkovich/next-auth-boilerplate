'use client';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
// Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Utils
import { getPasswordStrength } from './PasswordInputUtils';

interface PasswordInputProps {
  id: string;
  placeholder: string;
  label: string;
  isDisabled?: boolean;
  showPasswordStrengthBox?: boolean;
  form: UseFormRegisterReturn;
}

const PasswordInput = ({
  id,
  placeholder,
  label,
  isDisabled,
  form,
  showPasswordStrengthBox,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordStrengthVisible, setIsPasswordStrengthVisible] =
    useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    width: 0,
    color: '#fff',
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showPasswordStrength = () => {
    setIsPasswordStrengthVisible(true);
  };

  const hidePasswordStrength = (event: React.FocusEvent<HTMLInputElement>) => {
    form.onBlur(event);
    setIsPasswordStrengthVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.onChange(e);
    const valuses = getPasswordStrength(e.target.value);
    setPasswordStrength(valuses);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <label htmlFor={id} className='text-slate-800'>
          {label}
        </label>
        <div
          onClick={togglePasswordVisibility}
          className='flex items-center space-x-1 text-slate-800 cursor-pointer'
        >
          {isPasswordVisible ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
          {isPasswordVisible ? <p>Hide</p> : <p>Show</p>}
        </div>
      </div>
      <div className='relative'>
        <input
          {...form}
          className='border border-slate-700 rounded-md px-3 py-2 outline-none w-full '
          type={isPasswordVisible ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          disabled={isDisabled}
          onFocus={showPasswordStrength}
          onBlur={hidePasswordStrength}
          onChange={handleInputChange}
        />
        {showPasswordStrengthBox && (
          <div
            className={`absolute bottom-0 left-0 h-1 w-[100%] bg-slate-400 rounded-b-3xl overflow-hidden transition-opacity duration-200 ${
              isPasswordStrengthVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              style={{
                width: `${passwordStrength.width}%`,
                backgroundColor: `${passwordStrength.color}`,
              }}
              className='overflow-hidden h-full w-0'
            >
              &nbsp;
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;

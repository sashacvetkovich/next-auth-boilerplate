import { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps {
  id: string;
  placeholder: string;
  type: 'email' | 'code' | 'name';
  label: string;
  isDisabled?: boolean;
  form: UseFormRegisterReturn;
  errorMessage?: string;
}

const TextInput = ({
  id,
  placeholder,
  type,
  label,
  isDisabled,
  form,
  errorMessage,
}: TextInputProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='text-primary-900'>
        {label}
      </label>
      <input
        className={`${
          errorMessage ? 'border-red-600' : 'border-primary-600'
        } border rounded-md px-3 py-2 focus:outline-1 text-primary-900 focus:outline-slate-500`}
        type={type === 'email' ? 'email' : 'text'}
        id={id}
        placeholder={placeholder}
        disabled={isDisabled}
        {...form}
      />
      {errorMessage ? (
        <p className='text-red-600 text-sm'>{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default TextInput;

import { UseFormReturn } from 'react-hook-form';

interface TextInputProps {
  id: string;
  placeholder: string;
  type: 'email' | 'code';
  label: string;
  isDisabled?: boolean;
  form: UseFormReturn<{
    email: string;
    password: string;
    code?: string | undefined;
  }>;
}

const TextInput = ({
  id,
  placeholder,
  type,
  label,
  isDisabled,
  form,
}: TextInputProps) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='text-slate-800'>
        {label}
      </label>
      <input
        className='border border-slate-700 rounded-md px-3 py-2 focus:outline-1 focus:outline-slate-500'
        type={type === 'email' ? 'email' : 'text'}
        id={id}
        placeholder={placeholder}
        disabled={isDisabled}
        {...form.register(type)}
      />
    </div>
  );
};

export default TextInput;

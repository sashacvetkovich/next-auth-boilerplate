import { UseFormRegisterReturn } from 'react-hook-form';

interface ToggleProps {
  isDisabled: boolean;
  form: UseFormRegisterReturn;
  isChecked: boolean;
}

const Toggle = ({ form, isDisabled, isChecked }: ToggleProps) => {
  return (
    <label className='inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only peer'
        disabled={isDisabled}
        checked={isChecked}
        {...form}
      />
      <div className="relative w-11 h-6 bg-primary-400 peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
    </label>
  );
};

export default Toggle;

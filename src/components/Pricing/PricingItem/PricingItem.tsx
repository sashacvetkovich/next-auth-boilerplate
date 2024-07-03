import Link from 'next/link';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from '@/components/shared/Button/Button';

interface PricingProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  link: string;
  isRecomended?: boolean;
}

const PricingItem = (props: PricingProps) => {
  const {
    title,
    price,
    description,
    features,
    buttonText,
    link,
    isRecomended,
  } = props;

  const containerClasses = `'flex flex-col items-start border border-primary-500 rounded-3xl py-10 px-8 shadow ${
    isRecomended ? 'bg-primary-700 text-white' : 'text-heading'
  }`;

  return (
    <div className={containerClasses}>
      <div className='flex items-start justify-between'>
        <p className=' text-2xl font-bold mb-2'>{title}</p>
        {isRecomended && (
          <p className='text-heading px-4 py-1.5 bg-white rounded-3xl'>
            Popular
          </p>
        )}
      </div>
      <div className='flex items-end'>
        <p className='text-3xl font-bold '>&#36; {price}</p>
        <p className=' ml-2'>/month</p>
      </div>
      <p className='opacity-80 mt-4 '>{description}</p>
      <div className='flex flex-col space-y-2 my-6'>
        {features.map((feature, index) => (
          <div className='flex items-center space-x-2' key={index}>
            <FaCircleCheck size={20} className='opacity-100' />
            <p className=''>{feature}</p>
          </div>
        ))}
      </div>
      <Link href={link} className='w-full'>
        <Button
          text={buttonText}
          type={isRecomended ? 'outline' : 'primary'}
          additionalStyles='w-full'
        />
      </Link>
    </div>
  );
};

export default PricingItem;

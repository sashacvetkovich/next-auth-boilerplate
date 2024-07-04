import Image from 'next/image';
import Button from '../shared/Button/Button';
import exampleImageSecondary from '@/assets/images/example-image-secondary.svg';

const CallToAction = () => {
  return (
    <div className='bg-primary-300 py-20'>
      <div className='container mx-auto px-5 sm:px-10 grid lg:grid-cols-2 gap-x-48 items-center'>
        <div className='space-y-6'>
          <h2 className='text-heading text-3xl font-bold'>
            Create your account today and get started for free!
          </h2>
          <p className='text-primary-800'>
            Lorem ipsum dolor sit amet consectetur adipiscing elit dolor semper
            at ac tempus enim laoreet massa non.
          </p>
          <div className='space-x-4'>
            <Button text='Get started' type='primaryMedium' />
            <Button text='Talk to sales' type='outlineMedium' />
          </div>
        </div>
        <div className='bg-white hidden lg:flex items-center justify-center rounded-xl'>
          <Image src={exampleImageSecondary} alt='example-image' />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

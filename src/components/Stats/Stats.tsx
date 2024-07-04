import Image from 'next/image';
import exampleImage from '@/assets/images/example-image.svg';

const Stats = () => {
  return (
    <div className='container mx-auto px-5 sm:px-10 py-20'>
      <h2 className='text-heading text-4xl font-bold text-center'>
        Our results in numbers
      </h2>
      <p className='text-primary-800 text-center my-6'>
        Lorem ipsum dolor sit amet consectet adipiscing elit eget quamumto.
      </p>
      <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-10'>
        <div className='border border-primary-400 p-8 rounded-xl'>
          <div className='flex items-center space-x-3'>
            <div className='bg-primary-200 p-3 rounded-lg'>
              <Image src={exampleImage} width={25} alt='example-image' />
            </div>
            <p className='text-primary-800'>Customer satisfaction</p>
          </div>
          <p className='text-primary-900 text-3xl font-bold mt-4'>
            99<span className='text-primary-600'>%</span>
          </p>
        </div>
        <div className='border border-primary-400 p-8 rounded-xl'>
          <div className='flex items-center space-x-3'>
            <div className='bg-primary-200 p-3 rounded-lg'>
              <Image src={exampleImage} width={25} alt='example-image' />
            </div>
            <p className='text-primary-800'>Active users</p>
          </div>
          <p className='text-primary-900 text-3xl font-bold mt-4'>
            32<span className='text-primary-600'>M</span>
          </p>
        </div>
        <div className='border border-primary-400 p-8 rounded-xl'>
          <div className='flex items-center space-x-3'>
            <div className='bg-primary-200 p-3 rounded-lg'>
              <Image src={exampleImage} width={25} alt='example-image' />
            </div>
            <p className='text-primary-800'>Company growth</p>
          </div>
          <p className='text-primary-900 text-3xl font-bold mt-4'>
            240<span className='text-primary-600'>%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

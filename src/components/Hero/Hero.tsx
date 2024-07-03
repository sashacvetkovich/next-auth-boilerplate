import Image from 'next/image';
import Button from '../shared/Button/Button';
import exampleImage from '@/assets/images/example-image.svg';

const Hero = () => {
  return (
    <div className='container mx-auto px-5 sm:px-10'>
      <div className='grid md:grid-cols-2 items-center justify-center mt-20 space-x-10 md:min-h-[30vw]'>
        <div>
          <h1 className='text-5xl font-bold text-heading'>
            Create your account
          </h1>
          <p className='text-primary-800 mt-8'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repudiandae, voluptatem distinctio laboriosam quae, repellat tempora
            eligendi possimus eum voluptas similique vel quidem laborum, esse
            quam sint quisquam. Exercitationem, adipisci tempore.
          </p>
          <div className='space-x-4 mt-8'>
            <Button text='Get started' type='primaryMedium' />
            <Button text='Talk to sales' type='outlineMedium' />
          </div>
        </div>
        <div className='bg-primary-200 hidden md:flex items-center justify-center rounded-3xl h-full'>
          <Image src={exampleImage} alt='example-image' />
        </div>
      </div>
    </div>
  );
};

export default Hero;

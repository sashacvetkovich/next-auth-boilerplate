import InfoMessage from '@/components/shared/InfoMessage/InfoMessage';

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center mt-10'>
      <div className="max-w-26">
        <InfoMessage type='error' text='Something went wrong' />
      </div>
    </div>
  );
};

export default ErrorPage;

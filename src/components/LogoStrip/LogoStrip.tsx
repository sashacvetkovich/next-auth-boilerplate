import Image from 'next/image';
import facebookImage from '@/assets/images/facebook.svg';
import youtubeImage from '@/assets/images/youTube.svg';
import twitchImage from '@/assets/images/twitch.svg';
import pinterestImage from '@/assets/images/pinterest.svg';
import webflowImage from '@/assets/images/webflow.svg';
import googleImage from '@/assets/images/google.svg';

const LogoStrip = () => {
  return (
    <div className='mt-20 container px-5 sm:px-10 mx-auto grid grid-cols-2 sm:grid-cols-6 gap-x-10 gap-y-10 items-center justify-items-center sm:justify-items-start'>
      <Image src={facebookImage} alt='facebook-icon' />
      <Image src={youtubeImage} alt='youtube-icon' />
      <Image src={twitchImage} alt='twitch-icon' />
      <Image src={pinterestImage} alt='pinterest-icon' />
      <Image src={webflowImage} alt='webflow-icon' />
      <Image src={googleImage} alt='google-icon' />
    </div>
  );
};

export default LogoStrip;

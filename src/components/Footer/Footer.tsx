import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='border border-t-primary-200 mt-auto'>
      <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 justify-between px-5 py-7 container mx-auto'>
        <p className='text-primary-800'>
          Copyright © 2023 Example | All Rights Reserved
        </p>
        <div className='flex items-center space-x-3'>
          <a href='#' className='p-1 bg-primary-300 rounded-md'>
            <FaFacebookF className='text-primary-800' />
          </a>
          <a href='#' className='p-1 bg-primary-300 rounded-md'>
            <FaInstagram className='text-primary-800' />
          </a>
          <a href='#' className='p-1 bg-primary-300 rounded-md'>
            <FaTwitter className='text-primary-800' />
          </a>
          <a href='#' className='p-1 bg-primary-300 rounded-md'>
            <FaYoutube className='text-primary-800' />
          </a>
          <a href='#' className='p-1 bg-primary-300 rounded-md'>
            <FaLinkedin className='text-primary-800' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

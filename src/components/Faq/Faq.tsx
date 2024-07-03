import React from 'react';
import Accordion from '../Accordion/Accordion';
import { questionList } from './faqData';

const Faq = () => {
  return (
    <div className='container mx-auto px-5 sm:px-10 mt-40 mb-20'>
      <h3 className='text-heading text-4xl font-bold text-center mb-10'>
        Frequently Asked Questions
      </h3>
      <p className='text-center max-w-3xl mx-auto text-primary-800'>
        Cras tincidunt lobortis feugiat vivamus at morbi leo urna molestie atole
        elementum eu facilisis faucibus interdum posuere.
      </p>
      <Accordion questionList={questionList} />
    </div>
  );
};

export default Faq;

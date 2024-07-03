import React from 'react';
import PricingItem from '../PricingItem/PricingItem';
import { pricingData } from './pricingData';

const PricingContainer = () => {
  return (
    <div className='container mx-auto px-5 sm:px-10 mt-40 mb-10 max-w-6xl'>
      <p className='text-center mb-1 uppercase text-primary-800 font-semibold tracking-wide'>
        Pricing
      </p>
      <h2 className='text-center mb-4 text-heading text-4xl font-bold'>
        Affordable pricing plans
      </h2>
      <p className='text-center max-w-2xl mx-auto text-primary-800'>
        Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu egestas
        morbi sem vulputate etiam facilisis pellentesque ut quis.
      </p>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16'>
        {pricingData.map((item, index) => (
          <PricingItem
            key={index}
            title={item.title}
            price={item.price}
            description={item.description}
            buttonText={item.buttonText}
            link={item.link}
            features={item.features}
            isRecomended={item.isRecomended}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingContainer;

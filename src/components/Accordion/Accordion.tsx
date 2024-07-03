interface AccordionProps {
  questionList: {
    question: string;
    answer: string;
  }[];
}

const Accordion = ({ questionList }: AccordionProps) => {
  return (
    <div>
      <div className='max-w-screen-xl mx-auto px-5 bg-white min-h-sceen'>
        <div className='grid divide-y divide-primary-300 max-w-xl mx-auto mt-8'>
          {questionList.map(({ answer, question }, index) => {
            return (
              <div className='py-5' key={index}>
                <details className='group'>
                  <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
                    <span className='text-primary-900 text-lg'>{question}</span>
                    <span className='transition group-open:rotate-180'>
                      <svg
                        fill='none'
                        height='24'
                        shape-rendering='geometricPrecision'
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='1.5'
                        viewBox='0 0 24 24'
                        width='24'
                        className='text-primary-900'
                      >
                        <path d='M6 9l6 6 6-6'></path>
                      </svg>
                    </span>
                  </summary>
                  <p className='text-primary-800 mt-3 group-open:animate-fadeIn'>
                    {answer}
                  </p>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

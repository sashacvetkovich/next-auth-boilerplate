type LoadingSpinnerSizeType = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size: LoadingSpinnerSizeType;
  className?: string;
}

const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  const calculateSpinnerSize = (size: LoadingSpinnerSizeType) => {
    if (size === 'lg') return 'h-20 w-20 border-8';
    if (size === 'md') return 'h-10 w-10 border-4';
    if (size === 'sm') return 'h-6 w-6 border-4';
  };

  const spinnerSize = calculateSpinnerSize(size);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`border-gray-300 animate-spin rounded-full border-t-primary-900 ${spinnerSize}`}
      />
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';
import { buttonStyles } from './ButtonStyles';

interface ButtonProps {
  type: 'primary' | 'full' | 'outline' | 'primaryMedium' | 'outlineMedium';
  text: string;
  isDisabled?: boolean;
  additionalStyles?: string;
}

const Button = ({ isDisabled, text, type, additionalStyles }: ButtonProps) => {
  const styles = `${additionalStyles ? additionalStyles : ''} ${
    buttonStyles[type]
  }`;

  return (
    <button className={styles} type='submit' disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;

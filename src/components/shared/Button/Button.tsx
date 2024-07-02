import React from 'react';
import { buttonStyles } from './ButtonStyles';

interface ButtonProps {
  type: 'primary' | 'full';
  text: string;
  isDisabled?: boolean;
}

const Button = ({ isDisabled, text, type }: ButtonProps) => {
  return (
    <button className={buttonStyles[type]} type='submit' disabled={isDisabled}>
      {text}
    </button>
  );
};

export default Button;

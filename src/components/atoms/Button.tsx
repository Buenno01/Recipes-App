import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId: string;
  imgSrc: string;
}

function Button({ testId, imgSrc, ...rest }: ButtonProps) {
  return (
    <button
      { ...rest }
    >
      <img src={ imgSrc } data-testid={ testId } alt="" />
    </button>
  );
}

export default Button;

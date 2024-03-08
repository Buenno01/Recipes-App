import { ButtonHTMLAttributes, ReactNode } from 'react';

interface BottomFixedBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function BottomFixedBtn({ children,
  ...props }: BottomFixedBtnProps) {
  return (
    <button
      { ...props }
      className="fixed bottom-0 h-14 rounded-lg w-11/12 bg-primary-yellow
      text-white font-bold left-1/2 right-1/2 transform -translate-x-1/2
      uppercase text-lg mb-2"
    >
      { children }
    </button>
  );
}

export default BottomFixedBtn;

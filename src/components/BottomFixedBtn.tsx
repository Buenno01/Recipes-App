import { ReactNode } from 'react';

interface BottomFixedBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  disabled?: boolean
}

function BottomFixedBtn({ disabled = false, children, ...props }: BottomFixedBtnProps) {
  return (
    <button
      { ...props }
      disabled={ disabled }
      className="fixed bottom-0 h-14 rounded-lg w-11/12 bg-primary-yellow
      text-white font-bold left-1/2 right-1/2 transform -translate-x-1/2
      uppercase text-lg mb-2"
    >
      { children }
    </button>
  );
}

export default BottomFixedBtn;

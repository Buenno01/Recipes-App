import { useNavigate } from 'react-router-dom';

interface LinkButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  to: string
}

function LinkButton({ text, to, onClick, ...rest }: LinkButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <button { ...rest } onClick={ (e) => handleClick(e) }>
      { text }
    </button>
  );
}

export default LinkButton;

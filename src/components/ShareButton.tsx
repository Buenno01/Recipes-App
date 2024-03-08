import { useState } from 'react';
import { copyTextToClipBoard } from '../utils/copyTextToClipBoard';
import shareIcon from '../assets/images/shareIcon.svg';
import LinkCopiedMessage from './atoms/LinkCopiedMessage';

type ShareButtonProps = {
  copyText: string,
  dataTestID: string,
  alt: string
};

function ShareButton({ copyText, dataTestID, alt }: ShareButtonProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleShare = async () => {
    const message = copyText.replace('/in-progress', '');
    await copyTextToClipBoard(message);

    setCopiedMessage(true);

    setTimeout(() => {
      setCopiedMessage(false);
    }, 500);
  };

  return (
    <button className="h-8 w-8 relative" onClick={ handleShare }>
      <img
        data-testid={ dataTestID }
        src={ shareIcon }
        alt={ alt }
        className="h-8"
      />
      {
          copiedMessage
          && (
            <LinkCopiedMessage />
          )
        }
    </button>
  );
}

export default ShareButton;

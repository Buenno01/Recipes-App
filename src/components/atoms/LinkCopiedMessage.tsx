import React from 'react';

function LinkCopiedMessage() {
  return (
    <p
      className="absolute top-10 right-0 z-20 text-center text-white
      text-sm w-28 py-2 bg-primary-yellow font-semibold
      rounded-bl-lg rounded-br-lg rounded-tl-lg"
    >
      <img className="absolute" src="" alt="" />
      Link copied!
    </p>
  );
}

export default LinkCopiedMessage;

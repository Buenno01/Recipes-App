import React from 'react';

type RecomendationsListRootProps = {
  children: React.ReactNode;
};

function RecomendationsListRoot({ children }: RecomendationsListRootProps) {
  return (
    <ul className="flex w-full flex-nowrap overflow-x-scroll gap-2 pb-4">
      { children }
    </ul>
  );
}

export default RecomendationsListRoot;

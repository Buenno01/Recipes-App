import React from 'react';

type RecomendationsListRootProps = {
  children: React.ReactNode;
};

function RecomendationsListRoot({ children }: RecomendationsListRootProps) {
  return (
    <ul className="flex w-screen flex-nowrap overflow-x-scroll">
      { children }
    </ul>
  );
}

export default RecomendationsListRoot;

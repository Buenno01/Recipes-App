import { ReactNode } from 'react';

type TopMenuRootProps = {
  children: ReactNode;
};

function TopMenuRoot({ children }: TopMenuRootProps) {
  return (
    <header data-testid="header-layout">
      { children }
    </header>
  );
}

export default TopMenuRoot;

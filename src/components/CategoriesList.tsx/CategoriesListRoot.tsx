import { ReactNode } from 'react';

type CategoriesListRootProps = {
  children: ReactNode;
};

function CategoriesListRoot({ children }: CategoriesListRootProps) {
  return (
    <ul>
      {children}
    </ul>
  );
}

export default CategoriesListRoot;

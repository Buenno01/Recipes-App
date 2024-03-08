import { ReactNode } from 'react';

type CategoriesListRootProps = {
  children: ReactNode;
};

function CategoriesListRoot({ children }: CategoriesListRootProps) {
  return (
    <ul className="flex justify-around py-4">
      {children}
    </ul>
  );
}

export default CategoriesListRoot;

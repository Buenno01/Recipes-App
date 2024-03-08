import { ReactNode } from 'react';
import InProgressProvider from './InProgressContext/InProgressProvider';
import RecipesProvider from './RecipesContext/RecipesProvider';

type CombinedProvidersProps = {
  children: ReactNode;
};

function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <RecipesProvider>
      <InProgressProvider>
        { children }
      </InProgressProvider>
    </RecipesProvider>
  );
}

export default CombinedProviders;

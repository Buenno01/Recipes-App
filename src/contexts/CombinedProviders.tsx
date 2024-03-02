import DoneRecipesProvider from './DoneRecipesContext/DoneRecipeProvider';
import FavoriteRecipesProvider from './FavoriteRecipesContext/FavoriteRecipesProvider';

type CombinedProvidersProps = {
  children: React.ReactNode;
};

function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <FavoriteRecipesProvider>
      <DoneRecipesProvider>
        {children}
      </DoneRecipesProvider>
    </FavoriteRecipesProvider>
  );
}

export default CombinedProviders;

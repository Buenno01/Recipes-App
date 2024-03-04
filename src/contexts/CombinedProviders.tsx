import DoneRecipesProvider from './DoneRecipesContext/DoneRecipeProvider';
import FavoriteRecipesProvider from './FavoriteRecipesContext/FavoriteRecipesProvider';
import RecipesProvider from './RecipesContext/RecipesProvider';

type CombinedProvidersProps = {
  children: React.ReactNode;
};

function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <RecipesProvider>
      <FavoriteRecipesProvider>
        <DoneRecipesProvider>
          {children}
        </DoneRecipesProvider>
      </FavoriteRecipesProvider>
    </RecipesProvider>
  );
}

export default CombinedProviders;

import FavoriteRecipesProvider from './FavoriteRecipesContext/FavoriteRecipesProvider';

type CombinedProvidersProps = {
  children: React.ReactNode;
};

function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <FavoriteRecipesProvider>
      {children}
    </FavoriteRecipesProvider>
  );
}

export default CombinedProviders;

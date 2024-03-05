import DoneRecipesProvider from './DoneRecipesContext/DoneRecipeProvider';

type CombinedProvidersProps = {
  children: React.ReactNode;
};

function CombinedProviders({ children }: CombinedProvidersProps) {
  return (
    <DoneRecipesProvider>
      {children}
    </DoneRecipesProvider>
  );
}

export default CombinedProviders;

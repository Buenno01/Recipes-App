import { AnyRecipeType } from '../@types/AnyRecipeType';
import RecipesList from './RecipesList';

type RecipesContainerProps = {
  recipes: AnyRecipeType[];
  loading: boolean;
  error: string;
};

function RecipesContainer({ recipes, loading, error }: RecipesContainerProps) {
  if (loading) return <p>Loading...</p>;
  if (error || !recipes) return <p>Error fetching recipes</p>;
  return (
    <RecipesList.Root>
      {
        recipes.map((recipe, index) => (
          <RecipesList.Item
            key={ recipe.name }
            recipe={ recipe }
            index={ index }
            recipeType={ recipe.type }
          />
        ))
      }
    </RecipesList.Root>
  );
}

export default RecipesContainer;

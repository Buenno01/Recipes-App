import { BasicRecipeInfoType } from '../@types/BasicRecipeInfoType';
import RecipesList from './RecipesList';

type RecipesContainerProps = {
  recipes: BasicRecipeInfoType[] | undefined;
  loading: boolean;
  error: string;
};

function RecipesContainer({ recipes, loading, error }: RecipesContainerProps) {
  if (loading) return <p>Loading...</p>;
  if (error || !recipes) return <p>Error fetching recipes</p>;
  return (
    <RecipesList.Root>
      {
        recipes.slice(0, 12).map((recipe, index) => (
          <RecipesList.Item
            key={ recipe.name }
            recipe={ recipe }
            index={ index }
          />
        ))
      }
    </RecipesList.Root>
  );
}

export default RecipesContainer;

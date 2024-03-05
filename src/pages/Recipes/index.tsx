import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import useFetchRecipesWithFilter from '../../hooks/useFetchRecipesWithFilter';
import RecipesContainer from '../../components/RecipesContainer';
import Categories from '../../components/Categories';

function Home() {
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';

  const {
    loading,
    error,
    recipes,
    category,
    setCategory,
    setType,
  } = useFetchRecipesWithFilter(recipeType);

  useEffect(() => { setType(recipeType); }, [recipeType, setType]);

  if (error || !recipes) return <p>Error fetching recipes</p>;
  return (
    <>
      <Categories
        selectedCategory={ category }
        setSelectedCategory={ setCategory }
      />
      <RecipesContainer
        error={ error }
        loading={ loading }
        recipes={ recipes.slice(0, 12) }
      />
    </>
  );
}

export default Home;

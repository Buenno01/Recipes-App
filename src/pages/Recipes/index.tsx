import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RecipeOptionsType } from '../../@types/RecipeOptionsType';
import RecipesContainer from '../../components/RecipesContainer';
import Categories from '../../components/Categories';
import { useRecipesContext } from '../../contexts/RecipesContext';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';
  const [category, setCategory] = useState<string>('');

  const { fetchParams, setFetchParams,
    error, loading, recipes } = useRecipesContext();

  useEffect(() => {
    if (category === '') {
      setFetchParams({ ...fetchParams, param: '', endpoint: 'name' });
    } else {
      setFetchParams({ ...fetchParams, param: category, endpoint: 'category' });
    }
  }, [category]);

  useEffect(() => {
    setFetchParams({ ...fetchParams, recipeType });
  }, [recipeType]);

  useEffect(() => {
    if (recipes) {
      if (recipes.length === 1 && fetchParams.endpoint === 'name') {
        const { id } = recipes[0];
        navigate(`/${recipeType}/${id}`);
      } else if (recipes.length === 0) {
        console.log(recipes);

        alert("Sorry, we haven't found any recipes for these filters");
      }
    }
  }, [recipes]);

  return (
    <>
      <Categories
        selectedCategory={ category }
        setSelectedCategory={ setCategory }
      />
      <RecipesContainer
        error={ error }
        loading={ loading }
        recipes={ recipes }
      />
    </>
  );
}

export default Home;

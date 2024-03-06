import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecipesContext } from '../contexts/RecipesContext';
import { FetchParamsType } from '../@types/RecipesContextType';

function SearchBar() {
  const initialState: FetchParamsType = {
    param: '',
    recipeType: undefined,
    endpoint: 'name',
  };
  const [form, setForm] = useState<FetchParamsType>(initialState);
  const { fetchParams, setFetchParams } = useRecipesContext();
  const { pathname } = useLocation();
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (form.endpoint === 'firstLetter' && form.param.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      setFetchParams({ ...fetchParams, param: form.param, endpoint: form.endpoint });
    }
  };

  useEffect(() => {
    setFetchParams({ ...fetchParams, recipeType });
  }, [recipeType]);

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        handleSubmit();
      } }
    >
      <input
        name="param"
        type="text"
        placeholder="Search..."
        value={ form.param }
        onChange={ handleChange }
        data-testid="search-input"
      />
      <div>
        <label>
          <input
            defaultChecked
            type="radio"
            name="endpoint"
            value="name"
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="endpoint"
            value="ingredient"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="endpoint"
            value="firstLetter"
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

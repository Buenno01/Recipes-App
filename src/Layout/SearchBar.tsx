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
      className="bg-primary-purple w-11/12 mx-auto rounded-lg
      rounded-t-xl flex flex-col items-center"
      onSubmit={ (e) => {
        e.preventDefault();
        handleSubmit();
      } }
    >
      <input
        className="w-full border border-gray-400 text-primary-black
        rounded-md h-10 placeholder:font-light px-4"
        name="param"
        type="text"
        placeholder="Search"
        value={ form.param }
        onChange={ handleChange }
        data-testid="search-input"
      />
      <div
        className="flex content-center justify-center gap-3
      text-white text-xs font-light py-3"
      >
        <label className="flex gap-1">
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
        <label className="flex gap-1">
          <input
            type="radio"
            name="endpoint"
            value="ingredient"
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label className="flex gap-1">
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
        className="w-2/3 text-center mb-2 bg-primary-yellow
        rounded-md uppercase font-bold text-white text-sm h-7"
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

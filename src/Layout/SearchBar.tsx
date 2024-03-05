import React, { useEffect, useState } from 'react';
import { useRecipesContext } from '../contexts/RecipesContext';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const searchInfo = useRecipesContext();
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
  };

  const handleSearch = () => {
    // onSearch(searchTerm, searchType);
  };

  useEffect(() => {
    if (searchType === 'firstLetter' && searchTerm.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
  }, [searchTerm, searchType]);

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={ searchTerm }
        onChange={ (e) => setSearchTerm(e.target.value) }
        data-testid="search-input"
      />
      <div>
        <label>
          <input
            defaultChecked
            type="radio"
            name="searchType"
            value="name"
           // checked={ searchType === 'name' }
            onChange={ () => handleSearchTypeChange('name') }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="ingredient"
           // checked={ searchType === 'ingredient' }
            onChange={ () => handleSearchTypeChange('ingredient') }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="firstLetter"
           // checked={ searchType === 'firstLetter' }
            onChange={ () => handleSearchTypeChange('firstLetter') }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

import React, { useEffect } from 'react';
import Button from '../../components/atoms/Button';
import searchIconSrc from '../../assets/images/searchIcon.svg';

type SearchButtonProps = {
  toggleSearchBarVisibility: () => void;
  setSearchBarVisibility: (arg: boolean) => void;
};

function SearchButton({ toggleSearchBarVisibility, setSearchBarVisibility }:
SearchButtonProps) {
  useEffect(() => {
    return () => setSearchBarVisibility(false);
  }, [setSearchBarVisibility]);
  return (
    <Button
      imgSrc={ searchIconSrc }
      testId="search-top-btn"
      onClick={ toggleSearchBarVisibility }
    />
  );
}

export default SearchButton;

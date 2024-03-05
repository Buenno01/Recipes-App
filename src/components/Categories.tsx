import { useLocation } from 'react-router-dom';
import CategoriesList from './CategoriesList.tsx';
import { RecipeOptionsType } from '../@types/RecipeOptionsType';
import useFetchCategories from '../hooks/useFetchCategories';

type CategoriesProps = {
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
};

function Categories({
  setSelectedCategory,
  selectedCategory,
}: CategoriesProps) {
  const location = useLocation();
  const recipeType: RecipeOptionsType = location.pathname.includes('meal')
    ? 'meals' : 'drinks';
  const {
    categories,
  } = useFetchCategories(recipeType);
  const handleCategory = (thisCategory: string) => {
    if (selectedCategory === thisCategory) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(thisCategory);
    }
  };
  return (
    <CategoriesList.Root>
      {
        categories.length > 0
        && categories.slice(0, 5).map((thisItem) => (
          <CategoriesList.Item
            key={ thisItem }
            category={ thisItem }
            handleClick={ () => { handleCategory(thisItem); } }
          />
        ))
      }
      <CategoriesList.Item
        category="All"
        handleClick={ () => { setSelectedCategory(''); } }
      />
    </CategoriesList.Root>
  );
}

export default Categories;

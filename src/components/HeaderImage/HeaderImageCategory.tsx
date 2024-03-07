import { useNavigate } from 'react-router-dom';
import CategoryBtn from '../atoms/CategoryBtn';

type HeaderImageCategoryProps = {
  category: string;
};

function HeaderImageCategory({ category }: HeaderImageCategoryProps) {
  const navigate = useNavigate();
  return (
    <span
      className="flex justify-center items-center gap-2
  font-bold text-primary-yellow"
    >
      <CategoryBtn onClick={ () => navigate('/meals') } category={ category } />
      <span>
        <p data-testid="recipe-category">
          {category}
        </p>
      </span>
    </span>
  );
}

export default HeaderImageCategory;

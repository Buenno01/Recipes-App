import { AnyRecipeType } from '../@types/AnyRecipeType';
import ShareButton from './ShareButton';
import HeaderImage from './HeaderImage';
import FavoriteButton from './FavoriteButton';

type DetailsHeaderProps = {
  recipe: AnyRecipeType;
};

function DetailsHeader({ recipe }: DetailsHeaderProps) {
  const { thumb, name, type } = recipe;
  const category = type === 'drinks' ? recipe.alcoholic : recipe.category;

  return (
    <HeaderImage.Root name={ name } thumb={ thumb }>
      <HeaderImage.TopInfoWrapper>
        <HeaderImage.Category
          category={ category }
        />
        <span className="flex gap-4">
          <FavoriteButton recipe={ recipe } />
          <ShareButton
            dataTestID="share-btn"
            alt="Compartilhar"
            copyText={ window.location.href }
          />
        </span>
      </HeaderImage.TopInfoWrapper>
    </HeaderImage.Root>
  );
}

export default DetailsHeader;

import { useNavigate } from 'react-router-dom';
import { FavoriteRecipeProps } from '../../@types/FavoriteRecipeType';
import ShareButton from '../ShareButton';

function FavoriteRecipe(props: FavoriteRecipeProps) {
  const { favoriteRecipe, index } = props;
  const url = `/${favoriteRecipe.type}s/${favoriteRecipe.id}`;

  return (
    <ShareButton
      dataTestID="a"
      alt="compartilhar"
      copyText={ window.location.origin + url }
    />
  );
}

export default FavoriteRecipe;

type IngredientListItemProps = {
  ingredient: string;
  measure: string;
  index: number;
};

function IngredientListItem({ ingredient, measure, index }: IngredientListItemProps) {
  return (
    <li>
      <p data-testid={ `${index}-ingredient-name-and-measure` }>
        {measure ? `${measure} - ` : ''}
        {ingredient}
      </p>
    </li>
  );
}

export default IngredientListItem;

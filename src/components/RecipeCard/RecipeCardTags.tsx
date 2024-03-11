import React from 'react';

type RecipeCardTagsProps = {
  index: number,
  tags: string[],
};
function RecipeCardTags({ index, tags }: RecipeCardTagsProps) {
  return (
    <ul className="flex gap-2">
      {
     tags.slice(0, 2).map((tagName: string) => {
       return (
         <li
           key={ tagName }
           data-testid={ `${index}-${tagName}-horizontal-tag` }
           className="px-2 bg-gray-200 rounded-full text-gray-500"
         >
           {tagName}
         </li>
       );
     })
      }
    </ul>
  );
}

export default RecipeCardTags;

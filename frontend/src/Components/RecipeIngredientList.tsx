import React from "react";
import { SearchFullRecipeById } from "../recipe";
import RecipeIngredient from "./RecipeIngredient";

interface Props {
  searchFullRecipeById: SearchFullRecipeById;
  //   extendedIngredient: ExtendedIngredient;
  //   title: string;
  //   image: string;
  //   servings: number;
  //   readyInMinutes: number;
  //   sourceURL: string;
  //   instructions: string[];
  //   summary: string;
}

const RecipeIngredientList = ({ searchFullRecipeById }: Props) => {
  const htmlString = searchFullRecipeById.instructions;
  const htmlString1 = searchFullRecipeById.summary;
  return (
    <div>
      <h1>{searchFullRecipeById.title}</h1>
      <img src={searchFullRecipeById.image} alt="" />
      <p>Servings: {searchFullRecipeById.servings}</p>
      <p>Ready in {searchFullRecipeById.readyInMinutes} minutes</p>
      <h1>Ingredients</h1>
      <div>
        {searchFullRecipeById.extendedIngredients.length > 0 ? (
          searchFullRecipeById.extendedIngredients.map((result) => (
            <RecipeIngredient
              key={result.id}
              measures={result.measures}
              name={result.name}
            />
          ))
        ) : (
          <h1>No Results</h1>
        )}
      </div>
      <h1>Instructions</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      <h1>Summary</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlString1 }} />
    </div>
  );
};

export default RecipeIngredientList;

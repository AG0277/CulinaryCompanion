import React, { useRef } from "react";
import { SearchFullRecipeById } from "../../SpoonacularAPI/recipe";
import RecipeIngredient from "../../Components/Recipe/RecipeIngredient";

interface Props {
  searchFullRecipeById: SearchFullRecipeById;
}

const RecipeIngredientList = ({ searchFullRecipeById }: Props) => {
  const uniqueIngredients = useRef(new Set());
  const htmlStringInstructions = searchFullRecipeById.instructions;
  const htmlStringSummary = searchFullRecipeById.summary;
  const addValue = (newIngredient: number) => {
    if (uniqueIngredients.current.has(newIngredient)) {
      uniqueIngredients.current.add(newIngredient);
      return false;
    }
    return true;
  };
  return (
    <div className="flex flex-col">
      <div className="max-w-[556px] mx-auto ">
        <h1 className="font-bold text-4xl text-center">
          {searchFullRecipeById.title}
        </h1>
        <img src={searchFullRecipeById.image} alt="" />
        <div className="justify-evenly rounded-xl border-2 border-t-8 border-t-emerald-200 flex mt-5 py-5">
          <div className="row inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mr-2"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M7 4.5c-.3 0-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v2.5h-1V5c0-.3-.2-.5-.5-.5s-.5.3-.5.5v3.3c0 .9.7 1.6 1.5 1.7v7c0 .6.4 1 1 1s1-.4 1-1v-7c.8-.1 1.5-.8 1.5-1.7V5c0-.2-.2-.5-.5-.5M9 5v6h1v6c0 .6.4 1 1 1s1-.4 1-1V2c-1.7 0-3 1.3-3 3m7-1c-1.4 0-2.5 1.5-2.5 3.3c-.1 1.2.5 2.3 1.5 3V17c0 .6.4 1 1 1s1-.4 1-1v-6.7c1-.7 1.6-1.8 1.5-3C18.5 5.5 17.4 4 16 4"
              />
            </svg>
            <p>Servings: {searchFullRecipeById.servings}</p>
            <p>Kcal: {searchFullRecipeById.Nutrients.kcal}</p>
            <p>Carbs: {searchFullRecipeById.Nutrients.carbohydrates}</p>
            <p>Protein: {searchFullRecipeById.Nutrients.protein}</p>
            <p>Fat: {searchFullRecipeById.Nutrients.fat}</p>
          </div>
          <div className="row inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p>Ready in {searchFullRecipeById.readyInMinutes} minutes</p>
          </div>
        </div>
        <h1>Ingredients</h1>
        <ul className="list-disc pl-4">
          {searchFullRecipeById.extendedIngredients.length > 0 ? (
            searchFullRecipeById.extendedIngredients.map((result) => (
              <>
                {addValue(result.id) ? (
                  <li key={result.id}>
                    <RecipeIngredient
                      measures={result.measures}
                      name={result.name}
                    />
                  </li>
                ) : (
                  <></>
                )}
              </>
            ))
          ) : (
            <h1>No Results</h1>
          )}
        </ul>
        <h1>Instructions</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlStringInstructions }} />
        <h1>Summary</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlStringSummary }} />
      </div>
    </div>
  );
};

export default RecipeIngredientList;

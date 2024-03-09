import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FindRecipeById } from "../api";
import { SearchFullRecipeById } from "../recipe";
import RecipeIngredientList from "../Components/RecipeIngredientList";

type Props = {};

const RecipePage = (props: Props) => {
  const params = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<SearchFullRecipeById>();
  const [serverError, setServerError] = useState<string>("");
  useEffect(() => {
    const getRecipe = async () => {
      const result = await FindRecipeById(params.recipeId!);
      if (typeof result === "string") {
        setServerError(result);
      } else if (Array.isArray(result.extendedIngredients)) {
        setRecipe(result);
      }
    };
    getRecipe();
  }, []);
  return (
    <div>
      {serverError ? (
        <h1>{serverError}</h1>
      ) : (
        recipe && <RecipeIngredientList searchFullRecipeById={recipe} />
      )}
    </div>
  );
};

export default RecipePage;

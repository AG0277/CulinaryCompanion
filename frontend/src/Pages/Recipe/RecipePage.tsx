import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FindRecipeById, getRecipeNutrition } from "../../SpoonacularAPI/api";
import { Nutrients, SearchFullRecipeById } from "../../SpoonacularAPI/recipe";
import RecipeIngredientList from "./RecipeIngredientList";

type Props = {};

const RecipePage = (props: Props) => {
  const params = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<SearchFullRecipeById>();
  const [serverError, setServerError] = useState<string>("");
  useEffect(() => {
    const getRecipe = async () => {
      const result = await FindRecipeById(params.recipeId!);
      const nutrition: Nutrients | string = await getRecipeNutrition(
        params.recipeId!
      );
      if (typeof result === "string") {
        setServerError(result);
      } else if (typeof nutrition === "string") {
        setServerError(nutrition);
      } else if (
        Array.isArray(result.extendedIngredients) &&
        !(typeof nutrition === "string")
      ) {
        result.Nutrients = nutrition;
        setRecipe(result);
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

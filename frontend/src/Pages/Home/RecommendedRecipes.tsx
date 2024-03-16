import React, { useState } from "react";
import { RandomRecipe } from "../../SpoonacularAPI/recipe";
import { MealCategory, homeRecipeData } from "../../Data/RecommendedRecipes";
import Card from "../../Components/Card/Card";

type Props = {};

const RecommendedRecipes = (props: Props) => {
  return (
    <div>
      {homeRecipeData.map((category: MealCategory) => (
        <>
          <h5 className="w-fit font-bold border-b-4 border-orangeIsh">
            {category.title}
          </h5>
          <div className="flex flex-col items-center">
            <div key={category.title} className="flex">
              {category.foods.map((item) => (
                <Card
                  recipeName={item.recipeName}
                  id={item.id}
                  image={item.image}
                />
              ))}
            </div>
            <button className="bg bg-greenIsh my-5 w-40 h-12 rounded-2xl">
              See more
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default RecommendedRecipes;

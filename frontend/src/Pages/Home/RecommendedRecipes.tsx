import React, { useState } from "react";
import { MealCategory, homeRecipeData } from "../../Data/RecommendedRecipes";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router";
type Props = {};

const RecommendedRecipes: React.FC<Props> = (props: Props): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = (category: string) => {
    console.log(category);
    if (category == "Breakfast") navigate(`/${category}`);
    else if (category == "Beef") navigate(`/${category}`);
  };
  return (
    <div className="my-0">
      {homeRecipeData.map((category: MealCategory) => (
        <div key={category.title} className="my-20">
          <h3 className="w-fit font-bold border-b-4 border-orangeIsh mb-1">
            {category.title}
          </h3>
          <div className="flex flex-col items-center ">
            <div key={category.title} className="flex flex-wrap">
              {category.foods.map((item) => (
                <Card
                  key={item.id}
                  recipeName={item.recipeName}
                  id={item.id}
                  image={item.image}
                />
              ))}
            </div>
            <button
              className="bg bg-buttonColor my-5 w-40 h-12 rounded-2xl hover:border-2 hover:border-gray-500"
              onClick={() => handleClick(category.title)}
            >
              See more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedRecipes;

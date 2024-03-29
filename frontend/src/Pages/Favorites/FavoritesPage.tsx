import React, { useEffect } from "react";
import { useFavorites } from "../../Hooks/useFavorite";
import Card from "../../Components/Card/Card";

type Props = {};

const FavoritesPage = (props: Props) => {
  const { favoriteRecipesSet } = useFavorites();
  return (
    <div className="flex flex-col items-center">
      <h1>Favorites</h1>
      <div className="flex flex-row flex-wrap justify-center align-middle w-[1100px]">
        {favoriteRecipesSet ? (
          favoriteRecipesSet.map((recipe) => (
            <Card
              key={parseInt(recipe.recipeId)}
              id={parseInt(recipe.recipeId)}
              image={recipe.image}
              recipeName={recipe.title}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

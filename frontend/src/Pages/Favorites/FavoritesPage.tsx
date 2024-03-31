import React, { useEffect } from "react";
import { useFavorites } from "../../Hooks/useFavorite";
import Card from "../../Components/Card/Card";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

type Props = {};

const FavoritesPage = (props: Props) => {
  const { favoriteRecipesSet } = useFavorites();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, []);
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

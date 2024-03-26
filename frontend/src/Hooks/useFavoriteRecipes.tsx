import React, { useEffect, useState } from "react";
import { getFavorite } from "../Services/FavoriteService";

export const useFavoriteRecipes = () => {
  const [favoriteRecipesSet, setFavoriteRecipesSet] = useState(new Set());

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavoriteRecipesSet(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  const addFavorite = (recipeId: number) => {
    const updatedFavorites = new Set(favoriteRecipesSet);
    updatedFavorites.add(recipeId);
    localStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(updatedFavorites))
    );
    setFavoriteRecipesSet(updatedFavorites);
  };

  const removeFavorite = (recipeId: number) => {
    const updatedFavorites = new Set(favoriteRecipesSet);
    updatedFavorites.delete(recipeId);
    localStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(updatedFavorites))
    );
    setFavoriteRecipesSet(updatedFavorites);
  };

  const getFavorites = async () => {
    await getFavorite().then((res) => {
      if (res?.data) {
        const favoriteSet = new Set(res?.data);
        setFavoriteRecipesSet(favoriteSet);
        localStorage.setItem(
          "favorites",
          JSON.stringify(Array.from(favoriteSet))
        );
      }
    });
  };
  const isFavorite = (recipeId: number) => {
    return favoriteRecipesSet.has(recipeId);
  };
  return {
    favoriteRecipes: favoriteRecipesSet,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavorites,
  };
};

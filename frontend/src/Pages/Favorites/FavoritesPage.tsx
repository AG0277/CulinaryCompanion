import React from "react";
import { useFavorites } from "../../Hooks/useFavorite";

type Props = {};

const FavoritesPage = (props: Props) => {
  const { getFavorites, favoriteRecipesSet } = useFavorites();
  return <div></div>;
};

export default FavoritesPage;

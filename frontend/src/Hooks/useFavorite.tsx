import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addFavoriteAPI,
  deleteFavoriteAPI,
  getFavoriteAPI,
} from "../Services/FavoriteService";
import { useAuth } from "./useAuth";
import { Favorite } from "../Models/Favorite";

export type FavoriteContextType = {
  favoriteRecipesSet: Favorite[] | null;
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;
  getFavorites: () => void;
  isFavorite: (recipeId: number) => boolean;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);
type Props = { children: React.ReactNode };
export const FavoritesProvider = ({ children }: Props) => {
  const [favoriteRecipesSet, setFavoriteRecipesSet] = useState<Favorite[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const v = JSON.parse(storedFavorites) as Favorite[];
      setFavoriteRecipesSet(v);
    } else {
      if (isLoggedIn()) {
        getFavorites();
      }
    }
    console.log(favoriteRecipesSet);
    setIsReady(true);
  }, []);

  const addFavorite = async (recipeId: number) => {
    await addFavoriteAPI(recipeId).then((res) => {
      const updatedFavorites = [...favoriteRecipesSet];
      updatedFavorites.push({ recipeId: recipeId.toString() });
      localStorage.setItem(
        "favorites",
        JSON.stringify(Array.from(updatedFavorites))
      );
      setFavoriteRecipesSet(updatedFavorites);
    });
  };

  const removeFavorite = async (recipeId: number) => {
    await deleteFavoriteAPI(recipeId).then(() => {
      const Favorites = [...favoriteRecipesSet];
      const updatedFavorites = Favorites.filter(
        (x) => x.recipeId != recipeId.toString()
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(Array.from(updatedFavorites))
      );
      setFavoriteRecipesSet(updatedFavorites);
    });
  };

  const getFavorites = async () => {
    await getFavoriteAPI().then((res) => {
      if (res?.data) {
        const dae: Favorite[] = res?.data;
        setFavoriteRecipesSet(dae);
        localStorage.setItem(
          "favorites",
          JSON.stringify(Array.from(res?.data))
        );
      }
    });
  };
  const isFavorite = (recipeId: number) => {
    const exists = favoriteRecipesSet?.find(
      (x) => x.recipeId == recipeId.toString()
    );
    return !!exists;
  };
  return (
    <FavoriteContext.Provider
      value={{
        favoriteRecipesSet,
        addFavorite,
        removeFavorite,
        getFavorites,
        isFavorite,
      }}
    >
      {isReady ? children : null}
    </FavoriteContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("Something went wrong in useFavorite");
  }
  return context;
}

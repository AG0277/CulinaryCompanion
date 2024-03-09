import axios from "axios";
import React from "react";
import { SearchRecipes } from "./recipe";

export const SearchRecipe = async (query: string) => {
  try {
    const send = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=200&apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = await axios.get<SearchRecipes>(send);
    return data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("error message from API: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "Search recipes error has occurred ";
    }
  }
};

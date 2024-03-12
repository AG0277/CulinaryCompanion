import axios from "axios";
import React from "react";
import {
  SearchFullRecipeById,
  SearchRecipesByNeutralLanguage,
  Nutrients,
  RecipeInfo,
  RandomRecipe,
} from "./recipe";

export const SearchRecipe = async (query: string) => {
  try {
    const send = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=200&apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = await axios.get<SearchRecipesByNeutralLanguage>(send);
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

export const FindRecipeById = async (query: string) => {
  try {
    const send = `https://api.spoonacular.com/recipes/${query}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = await axios.get<SearchFullRecipeById>(send);
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

export const getRecipeNutrition = async (query: string) => {
  try {
    const send = `https://api.spoonacular.com/recipes/${query}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = (await axios.get(send)).data;
    const nutrientAmounts: Nutrients = {
      kcal: data.calories,
      protein: data.protein,
      fat: data.fat,
      carbohydrates: data.carbs,
    };
    return nutrientAmounts;
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

export const GetRandomRecipe = async () => {
  try {
    const send = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`;
    const data = await axios.get<RandomRecipe>(send);
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

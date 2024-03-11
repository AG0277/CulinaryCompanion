import axios from "axios";
import React from "react";
import {
  SearchFullRecipeById,
  SearchRecipesByNeutralLanguage,
  getNutrientByRecipeId,
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
    const send = `https://api.spoonacular.com/recipes/${query}/information?&apiKey=${process.env.REACT_APP_API_KEY}`;
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
    const nutrients: getNutrientByRecipeId[] = data.nutrients.map(
      (nutrient: getNutrientByRecipeId) => ({
        name: nutrient.name,
        amount: nutrient.amount,
        unit: nutrient.unit,
        percentOfDailyNeeds: nutrient.percentOfDailyNeeds,
      })
    );
    return nutrients;
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

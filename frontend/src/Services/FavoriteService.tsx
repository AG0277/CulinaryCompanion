import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5095/api/";

export const addFavorite = async (spoonacularId: string) => {
  try {
    const data = await axios.post(api + `favorite/${spoonacularId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getFavorite = async () => {
  try {
    const data = await axios.get(api + `favorite/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteFavorite = async (recipeId: string) => {
  try {
    const data = await axios.delete(api + `favorite/${recipeId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

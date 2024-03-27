import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5095/api/";

export const addFavoriteAPI = async (spoonacularId: number) => {
  try {
    const data = await axios.post(api + `favorite/${spoonacularId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getFavoriteAPI = async () => {
  try {
    const data = await axios.get(api + `favorite/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteFavoriteAPI = async (recipeId: number) => {
  try {
    const data = await axios.delete(api + `favorite/${recipeId}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

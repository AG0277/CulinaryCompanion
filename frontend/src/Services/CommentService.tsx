import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5095/api/";

export const addCommentAPI = async (spoonacularId: number, Content: string) => {
  try {
    const data = await axios.post<Comment>(api + `comment/${spoonacularId}`, {
      content: Content,
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCommentsAPI = async (spoonacularId: number) => {
  try {
    const data = await axios.get<Comment>(api + `comment/`, {
      params: {
        recipeid: spoonacularId,
      },
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteCommentAPI = async (commentId: number) => {
  try {
    const data = await axios.delete<Comment>(api + `comment/${commentId}`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const editCommentAPI = async (commentId: number, Content: string) => {
  try {
    const data = await axios.put<Comment>(api + `comment/${commentId}`, {
      content: Content,
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

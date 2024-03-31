import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentDb } from "../Models/Comment";

const api = "http://localhost:5095/api/";

export const addCommentAPI = async (spoonacularId: number, Content: string) => {
  try {
    const data = await axios.post<CommentDb>(api + `comment/${spoonacularId}`, {
      content: Content,
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getCommentsAPI = async (spoonacularId: number) => {
  try {
    const data = await axios.get<CommentDb>(api + `comment/`, {
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
    const data = await axios.delete<CommentDb>(api + `comment/${commentId}`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const editCommentAPI = async (commentId: number, Content: string) => {
  try {
    const data = await axios.put<CommentDb>(api + `comment/${commentId}`, {
      content: Content,
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

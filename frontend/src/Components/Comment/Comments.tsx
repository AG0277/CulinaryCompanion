import React, { useEffect, useRef, useState } from "react";
import {
  deleteCommentAPI,
  getCommentsAPI,
} from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";
import AddComments from "./AddComments";

import { useAuth } from "../../Hooks/useAuth";
import RecipeComment from "./RecipeComment";

interface Props {
  recipeId: number;
}

const Comments = ({ recipeId }: Props) => {
  const [commentsArray, setCommentsArray] = useState<CommentDb[]>([]);
  const textarea = useRef<HTMLTextAreaElement[] | null>([]);
  const { user } = useAuth();

  const isUserComment = (username: string) => {
    if (user?.username == username) return true;
    return false;
  };
  const handleTextAreaRef = (
    element: HTMLTextAreaElement | null,
    id: number
  ) => {
    if (element && textarea.current)
      if (textarea.current[id]) {
        textarea.current[id] = element;
      }
  };
  const addComment = (newComment: CommentDb) => {
    setCommentsArray((prevComments) => [newComment, ...prevComments]);
  };

  const editComment = (oldCommentId: number, newComment: CommentDb) => {
    setCommentsArray((prevComments) => {
      const indexToUpdate = prevComments.findIndex(
        (comment) => comment.id === oldCommentId
      );
      if (indexToUpdate !== -1) {
        const updatedComments = [...prevComments];
        updatedComments[indexToUpdate] = {
          ...(updatedComments[indexToUpdate] = newComment),
        };
        return updatedComments;
      }
      return prevComments;
    });
  };
  const deleteComment = async (commentId: number) => {
    const result = await deleteCommentAPI(commentId);
    if (result) {
      setCommentsArray((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    }
  };
  useEffect(() => {
    const getDbComments = async () => {
      const data = await getCommentsAPI(recipeId);
      if (Array.isArray(data)) {
        setCommentsArray(data);
      }
    };

    getDbComments();
  }, []);
  return (
    <div className="w-min">
      <h1>Comments</h1>
      <AddComments recipeId={recipeId} onAddComment={addComment} />
      {commentsArray.map((item) => (
        <RecipeComment
          key={item.id}
          isUserComment={isUserComment}
          item={item}
          handleTextAreaRef={handleTextAreaRef}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default Comments;

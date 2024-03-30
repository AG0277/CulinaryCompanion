import React, { useEffect, useState } from "react";
import {
  addCommentAPI,
  deleteCommentAPI,
  editCommentAPI,
  getCommentsAPI,
} from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";

interface Props {
  recipeId: number;
}

const Comments = ({ recipeId }: Props) => {
  const [commentsArray, setCommentsArray] = useState<CommentDb[]>([]);
  useEffect(() => {
    // addCommentAPI(recipeId, "asdasdasdasdsa");
    const getDbComments = async () => {
      const data = await getCommentsAPI(recipeId);
      if (Array.isArray(data)) {
        setCommentsArray(data);
      }
    };
    getDbComments();
    // deleteCommentAPI(5);
    // editCommentAPI(7, "qweqweqweqwe");
  }, []);
  return (
    <div>
      <h1>Comments</h1>
      {commentsArray.map((item) => (
        <div className="flex flex-col mb-10">
          <div className="flex justify-start items-center">
            <h4 className="mr-2">{item.createdBy}</h4>
            <p className="pt-1">{item.createdOn}</p>
          </div>
          <textarea
            name="asd"
            id="2"
            value={item.content}
            cols={90}
            rows={1}
            className="bg-transparent resize-none focus:outline-none hover:cursor-auto"
            readOnly={true}
          ></textarea>
        </div>
      ))}
    </div>
  );
};

export default Comments;

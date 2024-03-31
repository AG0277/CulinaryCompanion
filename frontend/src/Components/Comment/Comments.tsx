import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  addCommentAPI,
  deleteCommentAPI,
  editCommentAPI,
  getCommentsAPI,
} from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";
import ReactTextareaAutosize from "react-textarea-autosize";
import AddComments from "./AddComments";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../Hooks/useAuth";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineDelete } from "react-icons/md";

interface Props {
  recipeId: number;
}

const Comments = ({ recipeId }: Props) => {
  const [commentsArray, setCommentsArray] = useState<CommentDb[]>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  const addComment = (newComment: CommentDb) => {
    setCommentsArray((prevComments) => [...prevComments, newComment]);
  };

  const isUserComment = (username: string) => {
    if (user?.username == username) return true;
    return false;
  };

  const EditComment = () => {
    textarea.current?.focus();
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
    <div>
      <h1>Comments</h1>
      <AddComments recipeId={recipeId} onAddComment={addComment} />
      {commentsArray.map((item) => (
        <div className="flex flex-col mb-10" key={item.id}>
          <div className="flex justify-start items-center">
            <h4 className="mr-2">{item.createdBy}</h4>
            <p className="pt-1">{item.createdOn}</p>
          </div>
          <div className="flex justify-between">
            <ReactTextareaAutosize
              id="2"
              value={item.content}
              cols={160}
              ref={textarea}
              minRows={1}
              maxRows={5}
              className="bg-transparent resize-none focus:outline-none hover:cursor-auto overflow-hidden"
              readOnly={true}
            ></ReactTextareaAutosize>
            {isUserComment(item.createdBy) ? (
              <>
                <CiEdit
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={EditComment}
                />
                <MdOutlineDelete className="  w-6 h-6 hover:cursor-pointer" />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;

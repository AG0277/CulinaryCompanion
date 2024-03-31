import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { CommentDb } from "../../Models/Comment";
import { useAuth } from "../../Hooks/useAuth";
import EditComment from "./EditComment";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import AddComments from "./AddComments";

type Props = {
  item: CommentDb;
  isUserComment: (user: string) => boolean;
  handleTextAreaRef: (
    element: HTMLTextAreaElement | null,
    textareaid: number
  ) => void;
  editComment: (oldCommentId: number, newComment: CommentDb) => void;
  deleteComment: (commentId: number) => void;
};

const RecipeComment = ({
  item,
  isUserComment,
  handleTextAreaRef,
  editComment,
  deleteComment,
}: Props) => {
  const [text, setText] = useState("");
  const [Edit, setEdit] = useState<Boolean>(false);
  const handleChange = (event: any) => {
    setText(event.target.value);
  };
  return (
    <div className="flex flex-col mb-10" key={item.id}>
      <div className="flex justify-start items-center">
        <h4 className="mr-2">{item.createdBy}</h4>
        <p className="pt-1">{item.createdOn}</p>
      </div>
      <div className="flex justify-between">
        {!Edit ? (
          <>
            <ReactTextareaAutosize
              id={item.id.toString()}
              defaultValue={item.content}
              cols={90}
              ref={(element) => handleTextAreaRef(element, item.id)}
              minRows={1}
              maxRows={5}
              onChange={handleChange}
              readOnly={true}
              className="bg-transparent focus:outline-none resize-none hover:cursor-auto overflow-hidden"
            ></ReactTextareaAutosize>
            {isUserComment(item.createdBy) ? (
              <>
                <CiEdit
                  className="w-6 h-6 hover:cursor-pointer"
                  onClick={() => setEdit(true)}
                />
                <MdOutlineDelete
                  className="  w-6 h-6 hover:cursor-pointer"
                  onClick={() => deleteComment(item.id)}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <EditComment
              defaultValue={item.content}
              commentId={item.id}
              setEdit={setEdit}
              editComment={editComment}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeComment;

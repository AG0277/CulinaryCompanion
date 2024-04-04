import React, { useEffect, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { addCommentAPI } from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";

interface Props {
  recipeId: number;
  onAddComment: (newComment: CommentDb) => void;
  columns: number;
}

const AddComments = ({ recipeId, onAddComment, columns }: Props) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const text = textarea.current?.value;
    if (text) {
      const result = await addCommentAPI(recipeId, text);
      textarea.current.value = "";
      if (result) onAddComment(result);
    }
  };
  useEffect(() => {
    console.log(columns);
  });
  return (
    <div className="mb-5 relative">
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <ReactTextareaAutosize
          id="addComment"
          ref={textarea}
          cols={columns}
          minRows={1}
          maxRows={5}
          placeholder="Add comment"
          className="bg-transparent resize-none focus:outline-none hover:cursor-auto"
        ></ReactTextareaAutosize>
        <hr className="border-t-2 border-gray-400 " />
        <br></br>
        <br></br>
        <button
          type="submit"
          className="rounded-xl min-h-8 min-w-24 bg-buttonColor absolute bottom-0 right-0"
        >
          Comment
        </button>
        <button
          type="reset"
          className="rounded-xl min-h-8 min-w-24 bg-buttonColor absolute bottom-0 right-0 mr-28"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddComments;

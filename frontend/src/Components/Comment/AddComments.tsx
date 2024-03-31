import React, { useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { addCommentAPI, getCommentsAPI } from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";

interface Props {
  recipeId: number;
  onAddComment: (newComment: CommentDb) => void;
}

const AddComments = ({ recipeId, onAddComment }: Props) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const text = textarea.current?.value;
    if (text) {
      const result = await addCommentAPI(recipeId, text);
      textarea.current.value = "";
      if (result) onAddComment(result);
    }
  };
  return (
    <div className="mb-5 relative w-fit ">
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <ReactTextareaAutosize
          ref={textarea}
          cols={155}
          minRows={1}
          maxRows={5}
          placeholder="Add comment"
          className="bg-transparent resize-none focus:outline-none hover:cursor-auto"
        ></ReactTextareaAutosize>
        <hr />
        <br></br>
        <br></br>
        <button
          type="submit"
          className="rounded-xl min-h-8 min-w-24 bg-greenIsh absolute bottom-0 right-0"
        >
          Comment
        </button>
        <button
          type="reset"
          className="rounded-xl min-h-8 min-w-24 bg-greenIsh absolute bottom-0 right-0 mr-28"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddComments;

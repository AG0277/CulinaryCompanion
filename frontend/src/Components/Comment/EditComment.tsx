import React, { useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { editCommentAPI } from "../../Services/CommentService";
import { CommentDb } from "../../Models/Comment";

type Props = {
  commentId: number;
  setEdit: (edit: boolean) => void;
  editComment: (oldCommentId: number, newComment: CommentDb) => void;
  defaultValue: string;
};

const EditComment = ({
  commentId,
  setEdit,
  editComment,
  defaultValue,
}: Props) => {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    const text = textarea.current?.value;
    if (text) {
      const result = await editCommentAPI(commentId, text);
      if (result) {
        editComment(commentId, result);
        setEdit(false);
      }
    }
  };
  return (
    <div className="mb-5 relative w-full">
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <ReactTextareaAutosize
          defaultValue={defaultValue}
          id="addComment"
          ref={textarea}
          cols={90}
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
          Save
        </button>
        <button
          onClick={() => setEdit(false)}
          type="reset"
          className="rounded-xl min-h-8 min-w-24 bg-greenIsh absolute bottom-0 right-0 mr-28"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditComment;

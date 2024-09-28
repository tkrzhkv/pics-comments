import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentResponseType } from "@/shared/types/comments/getCommentsTypes.ts";

type CommentState = {
  enteredComment: string;
  localComments: CommentResponseType[];
};

const initialState: CommentState = {
  enteredComment: "",
  localComments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setEnteredComment: (state, action: PayloadAction<string>) => {
      state.enteredComment = action.payload;
    },
    resetComment: (state) => {
      state.enteredComment = "";
    },
    setAllComments: (state, action: PayloadAction<CommentResponseType[]>) => {
      state.localComments = action.payload;
    },
    addLocalComment: (state, action: PayloadAction<CommentResponseType>) => {
      state.localComments.push(action.payload);
    },
    deleteLocalComment: (state, action: PayloadAction<number>) => {
      state.localComments = state.localComments.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
});

export const {
  setEnteredComment,
  resetComment,
  setAllComments,
  addLocalComment,
  deleteLocalComment,
} = commentSlice.actions;
export default commentSlice.reducer;

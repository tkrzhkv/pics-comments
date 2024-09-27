import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentState = {
  enteredComment: string;
};

const initialState: CommentState = {
  enteredComment: "",
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
  },
});

export const { setEnteredComment, resetComment } = commentSlice.actions;
export default commentSlice.reducer;

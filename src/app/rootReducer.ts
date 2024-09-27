import { combineReducers } from "@reduxjs/toolkit";
import scrollSlice from "@/features/comment/persistedScroll/model/scrollSlice.ts";
import commentSlice from "@/features/comment/persistedComment/model/commentSlice.ts";

export const rootReducer = combineReducers({
  scroll: scrollSlice,
  comment: commentSlice,
});

import commentSlice from "@/features/comment/createComment/model/commentSlice.ts";
import scrollSlice from "@/features/comment/persistedScroll/model/scrollSlice.ts";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
	scroll: scrollSlice,
	comment: commentSlice,
});

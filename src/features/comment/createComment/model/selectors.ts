// commentSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/appStore.ts"; // Adjust the path as necessary

const selectBase = (state: RootState) => state.comment;

export const selectLocalComments = createSelector(
  selectBase,
  (state) => state.localComments,
);

export const selectEnteredComment = createSelector(
  selectBase,
  (state) => state.enteredComment,
);

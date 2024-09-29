import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/appStore.ts";

const selectBase = (state: RootState) => state.scroll;

export const selectScrollPosition = createSelector(
  selectBase,
  (state) => state.scrollPosition,
);

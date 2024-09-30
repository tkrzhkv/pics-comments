import type { RootState } from "@/app/appStore.ts";
import { createSelector } from "@reduxjs/toolkit";

const selectBase = (state: RootState) => state.scroll;

export const selectScrollPosition = createSelector(
	selectBase,
	(state) => state.scrollPosition,
);

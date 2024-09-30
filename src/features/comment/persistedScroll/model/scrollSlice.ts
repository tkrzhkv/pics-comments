import { createSlice } from "@reduxjs/toolkit";

interface ScrollState {
	scrollPosition: number;
	skip: number;
}

const initialState: ScrollState = {
	scrollPosition: 0,
	skip: 0,
};

const scrollSlice = createSlice({
	name: "scroll",
	initialState,
	reducers: {
		setScrollPosition(state, action) {
			state.scrollPosition = action.payload;
		},
		setSkip(state, action) {
			state.skip = action.payload;
		},
	},
});

export const { setScrollPosition, setSkip } = scrollSlice.actions;

export default scrollSlice.reducer;

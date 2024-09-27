import { createSlice } from "@reduxjs/toolkit";

interface ScrollState {
  scrollPosition: number;
}

const initialState: ScrollState = {
  scrollPosition: 0,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
  },
});

export const { setScrollPosition } = scrollSlice.actions;

export default scrollSlice.reducer;

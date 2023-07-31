import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
};

const selectedSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
  },
});

export default selectedSlice.reducer;
export const { setMovie } = selectedSlice.actions;

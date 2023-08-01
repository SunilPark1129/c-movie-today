import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
  currentLocation: null,
};

const selectedSlice = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    setNavigate(state, action) {
      state.currentLocation = action.payload;
    },
  },
});

export default selectedSlice.reducer;
export const { setMovie, setNavigate } = selectedSlice.actions;

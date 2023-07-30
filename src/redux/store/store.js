import { configureStore } from "@reduxjs/toolkit";
import movieFetchReducer from "../reducers/movieFetchReducer";

const store = configureStore({
  reducer: { movieFetchReducer },
});

export default store;

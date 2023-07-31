import { configureStore } from "@reduxjs/toolkit";
import movieFetchReducer from "../reducers/movieFetchReducer";
import selectedReducer from "../reducers/selectedReducer";

const store = configureStore({
  reducer: { movieFetchReducer, selectedReducer },
});

export default store;

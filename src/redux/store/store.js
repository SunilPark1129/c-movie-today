import { configureStore } from "@reduxjs/toolkit";
import movieFetchReducer from "../reducers/movieFetchReducer";
import selectedReducer from "../reducers/selectedReducer";
import queryFetchReducer from "../reducers/queryFetchReducer";

const store = configureStore({
  reducer: { movieFetchReducer, selectedReducer, queryFetchReducer },
});

export default store;

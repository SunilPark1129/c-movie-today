import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * state roles
 * @param {boolean} error - error message
 * @param {boolean} isLoading - fetch loading
 * @param {Object} data - fetched information
 * @param {[{movie: Object, page: number}]} lists - movie lists
 */
const initialState = {
  isLoading: false,
  error: null,
  data: null,
  lists: [],
};

const API_KEY = "api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89";
const BASE_URL = "https://api.themoviedb.org/3";
let currentURL;

export const requestFetch = createAsyncThunk(
  "data/fetchData",
  async ({ url, currentPage }) => {
    if (url !== null) {
      currentURL = url;
    }
    const data = await axios.get(BASE_URL + currentURL + currentPage + API_KEY);
    return { res: data.data };
  }
);

const fetchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    movieListClear(state) {
      state.data = null;
      state.error = null;
      state.isLoading = false;
      state.lists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.res;
      state.lists = [
        ...state.lists,
        { movies: action.payload.res.results, page: state.lists.length + 1 },
      ];
    });
    builder.addCase(requestFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default fetchSlice.reducer;
export const { movieListClear } = fetchSlice.actions;

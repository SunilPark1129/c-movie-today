import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * state roles
 * @param {Object} data - fetched information
 * @param {boolean} isLoading - fetch loading
 * @param {boolean} error - error message
 * @param {[{movie: Object, page: number}]} lists - movie lists
 * @param {string[]} queries - titles for searched term
 */
const initialState = {
  data: null,
  isLoading: false,
  error: null,
  lists: [],
  queries: [],
};

const API_KEY = "api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89";
const BASE_URL = "https://api.themoviedb.org/3";
let currentURL;

export const requestFetch = createAsyncThunk(
  "data/fetchData",
  async ({ url, currentPage, isQuery }) => {
    if (url !== null) {
      currentURL = url;
    }
    const data = await axios.get(BASE_URL + currentURL + currentPage + API_KEY);
    return { res: data.data, isQuery };
  }
);

const fetchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    movieListClear(state) {
      state.data = null;
      state.lists = [];
      state.queries = [];
    },
    queryListClear(state) {
      state.queries = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.res;
      if (action.payload.isQuery) {
        const temp = action.payload.res.results.filter((_, idx) => idx < 5);
        state.queries = temp;
      } else {
        state.lists = [
          ...state.lists,
          { movies: action.payload.res.results, page: state.lists.length + 1 },
        ];
      }
    });
    builder.addCase(requestFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default fetchSlice.reducer;
export const { movieListClear, queryListClear } = fetchSlice.actions;

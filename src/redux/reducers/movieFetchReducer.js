import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * state roles
 * @param {Object} data - fetched information
 * @param {boolean} isLoading - fetch loading
 * @param {boolean} error - error message
 * @param {[{movie: Object, page: number}]} lists - movie lists
 * @param {string[]} queries - title lists for searching term
 * @param {string[]} history - title history for searched term
 */
const initialState = {
  data: null,
  isLoading: false,
  error: null,
  lists: [],
  queries: [],
  histories: [],
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
      state.error = null;
    },
    queryListClear(state) {
      state.queries = [];
    },
    historyListClear(state, action) {
      state.histories = state.histories.filter(
        (item) => item !== action.payload
      );
    },
    historyAdd(state, { payload }) {
      let hasTarget = false;

      for (let c of state.histories) {
        // check if the payload already includes in the array
        if (c.toLowerCase().includes(payload.toLowerCase())) {
          hasTarget = true;
          break;
        }
      }

      if (hasTarget) {
        // take out the targeted index
        const temp = state.histories.filter(
          (title) => title.toLowerCase() !== payload.toLowerCase()
        );
        // push into front
        temp.unshift(payload);
        state.histories = [...temp];
      } else {
        // take out the last index if index is reached the limit
        const temp = state.histories.filter((_, idx) => idx < 5);
        temp.unshift(payload);
        state.histories = [...temp];
      }
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
        // take out the last index if index is reached the limit
        const temp = action.payload.res.results.filter((_, idx) => idx < 5);
        state.queries = [...temp];
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
export const { movieListClear, queryListClear, historyListClear, historyAdd } =
  fetchSlice.actions;

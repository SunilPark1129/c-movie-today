import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * state roles
 * @param {boolean} isLoading - fetch loading
 * @param {boolean} error - error message
 * @param {string[]} queries - title lists for searching term
 * @param {string[]} history - title history for searched term
 */
const initialState = {
  error: null,
  queries: [],
  histories: [],
};

const API_KEY = "api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89";
const BASE_URL = "https://api.themoviedb.org/3";
let currentURL;

export const requestQueryFetch = createAsyncThunk(
  "query/fetchData",
  async ({ url, currentPage }) => {
    if (url !== null) {
      currentURL = url;
    }
    const data = await axios.get(BASE_URL + currentURL + currentPage + API_KEY);
    return { res: data.data };
  }
);

const queryFetchSlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    queryListClear(state) {
      state.queries = [];
      state.error = null;
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
    builder.addCase(requestQueryFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      const temp = action.payload.res.results.filter((_, idx) => idx < 5);
      state.queries = [...temp];
    });
    builder.addCase(requestQueryFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default queryFetchSlice.reducer;
export const { queryListClear, historyListClear, historyAdd } =
  queryFetchSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null, // fetched information
  isLoading: false,
  error: null,
  lists: [], // movie lists
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
    console.log(url);
    const data = await axios.get(BASE_URL + currentURL + currentPage + API_KEY);
    return data.data;
  }
);

const fetchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    movieListClear(state) {
      state.data = null;
      state.lists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.data = action.payload;
      state.lists = [...state.lists, [...action.payload.results]];
    });
    builder.addCase(requestFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default fetchSlice.reducer;
export const { movieListClear } = fetchSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const API_KEY = "api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89";
const BASE_URL = "https://api.themoviedb.org/3";

export const requestFetch = createAsyncThunk("data/fetchData", async (url) => {
  const data = await axios.get(BASE_URL + url + API_KEY);
  return data.data;
});

const fetchSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(requestFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(requestFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default fetchSlice.reducer;

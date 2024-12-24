// redux/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostById } from "./operations";

const INITIAL_STATE = {
  items: [],
  post: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      // Обробка fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.items = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.items = [];
        state.loading = false;
        state.error = action.payload;
      })

      // Обробка fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.post = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.post = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const postsReducer = postsSlice.reducer;
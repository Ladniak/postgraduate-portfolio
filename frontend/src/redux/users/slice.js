import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchAuthMe, fetchRegister } from "./operations";

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

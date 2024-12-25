import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authInstance } from "../posts/operations";

authInstance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export const fetchUsers = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post(
      "http://localhost:3000/auth/login",
      params
    );
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post(
      "http://localhost:3000/auth/register",
      params
    );
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const { data } = await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

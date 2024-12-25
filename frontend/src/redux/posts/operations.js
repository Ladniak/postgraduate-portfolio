import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  try {
    const { data } = await authInstance.get("/posts");
    return data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPostById = createAsyncThunk("posts/fetchById", async (id) => {
  try {
    const { data } = await authInstance.get(`/posts/${id}`);
    return data.doc;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post");
  }
});

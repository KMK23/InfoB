import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteDatas, getDatas, updateDatas } from "../../pages/API/firebase";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const result = await getDatas(collectionName, queryOptions);
      // 모든 Timestamp 필드를 변환
      const serializedResult = result.map((post) => ({
        ...post,
        createdAt: post.createdAt
          ? {
              seconds: post.createdAt.seconds,
              nanoseconds: post.createdAt.nanoseconds,
            }
          : null,
        updatedAt: post.updatedAt
          ? {
              seconds: post.updatedAt.seconds,
              nanoseconds: post.updatedAt.nanoseconds,
            }
          : null,
      }));
      return serializedResult;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ collectionName, docId, data }, { rejectWithValue }) => {
    try {
      const result = await updateDatas(collectionName, docId, data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ collectionName, docId }, { rejectWithValue }) => {
    try {
      const result = await deleteDatas(collectionName, docId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

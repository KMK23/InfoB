import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteDatas,
  getDatas,
  updateDatas,
  getAnswers,
  addAnswer,
  updateAnswer,
} from "../../pages/API/firebase";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  isLoading: false,
  answers: {}, // { postId: { exists: boolean, data: [] } }
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

    // 답변 조회
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, exists, data } = action.payload;
        state.answers[postId] = { exists, data };
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // 답변 추가
    builder
      .addCase(createAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, answer } = action.payload;
        if (!state.answers[postId]) {
          state.answers[postId] = { exists: true, data: [] };
        }
        state.answers[postId].exists = true;
        state.answers[postId].data.push(answer);
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // 답변 수정
    builder
      .addCase(updateAnswerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnswerThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, answerId, answer } = action.payload;
        if (state.answers[postId]) {
          const index = state.answers[postId].data.findIndex(
            (a) => a.id === answerId
          );
          if (index !== -1) {
            state.answers[postId].data[index] = answer;
          }
        }
      })
      .addCase(updateAnswerThunk.rejected, (state, action) => {
        state.loading = false;
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

export const fetchAnswers = createAsyncThunk(
  "posts/fetchAnswers",
  async (postId) => {
    const response = await getAnswers(postId);
    return { postId, ...response };
  }
);

export const createAnswer = createAsyncThunk(
  "posts/createAnswer",
  async ({ postId, answerData }) => {
    const response = await addAnswer(postId, answerData);
    return { postId, answer: response };
  }
);

export const updateAnswerThunk = createAsyncThunk(
  "posts/updateAnswer",
  async ({ postId, answerId, answerData }) => {
    const response = await updateAnswer(postId, answerId, answerData);
    return { postId, answerId, answer: response };
  }
);

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

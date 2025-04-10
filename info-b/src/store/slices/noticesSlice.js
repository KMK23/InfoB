// src/store/slices/noticesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatas,
  addDatas,
  updateDatas,
  deleteDatas,
} from "../../pages/API/firebase";

// 공지사항 가져오기
export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const result = await getDatas(collectionName, queryOptions);
      const serializedResult = result.map((notice) => {
        // Timestamp를 안전하게 처리
        let createdAtDate = null;
        let updatedAtDate = null;

        if (notice.createdAt?.seconds) {
          createdAtDate = new Date(
            notice.createdAt.seconds * 1000
          ).toISOString();
        } else if (notice.createdAt) {
          createdAtDate = new Date(notice.createdAt).toISOString();
        }

        if (notice.updatedAt?.seconds) {
          updatedAtDate = new Date(
            notice.updatedAt.seconds * 1000
          ).toISOString();
        } else if (notice.updatedAt) {
          updatedAtDate = new Date(notice.updatedAt).toISOString();
        }

        return {
          ...notice,
          createdAt: createdAtDate,
          updatedAt: updatedAtDate,
        };
      });
      return serializedResult;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 공지사항 추가
export const addNotice = createAsyncThunk(
  "notices/addNotice",
  async ({ collectionName, data }, { rejectWithValue }) => {
    try {
      const newData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await addDatas(collectionName, newData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 공지사항 수정
export const updateNotice = createAsyncThunk(
  "notices/updateNotice",
  async ({ collectionName, id, data }, { rejectWithValue }) => {
    try {
      const updatedData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      const result = await updateDatas(collectionName, id, updatedData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 공지사항 삭제
export const deleteNotice = createAsyncThunk(
  "notices/deleteNotice",
  async ({ collectionName, docId }, { rejectWithValue }) => {
    try {
      const result = await deleteDatas(collectionName, docId);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const noticesSlice = createSlice({
  name: "notices",
  initialState: {
    notices: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addNotice.fulfilled, (state, action) => {
        state.notices.push(action.payload);
      })
      .addCase(updateNotice.fulfilled, (state, action) => {
        const index = state.notices.findIndex(
          (notice) => notice.docId === action.payload.docId
        );
        if (index !== -1) {
          state.notices[index] = action.payload;
        }
      })
      .addCase(deleteNotice.fulfilled, (state, action) => {
        state.notices = state.notices.filter(
          (notice) => notice.docId !== action.payload
        );
      });
  },
});

export default noticesSlice.reducer;

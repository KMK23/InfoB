import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../../../src/pages/API/firebase";

export const fetchTalent = createAsyncThunk(
  "talent/fetchTalent",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDatas("talent");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const talentSlice = createSlice({
  name: "talent",
  initialState: {
    talent: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTalent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTalent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.talent = action.payload;
      })
      .addCase(fetchTalent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default talentSlice.reducer;

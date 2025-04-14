import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../../../src/pages/API/firebase";

export const fetchBenefits = createAsyncThunk(
  "benefits/fetchBenefits",
  async ({ collectionName, queryOptions }, { rejectWithValue }) => {
    try {
      const data = await getDatas(collectionName, queryOptions);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const benefitsSlice = createSlice({
  name: "benefits",
  initialState: {
    benefits: null,
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBenefits.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchBenefits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.benefits = action.payload;
        state.error = null;
      })
      .addCase(fetchBenefits.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default benefitsSlice.reducer;

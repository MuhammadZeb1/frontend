import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  purchase: [],
  isLoading: false,
  error: null,
  message: null,
};
const getPurchase = createAsyncThunk(
  "purchase/getPurchase",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/purchase/purchase");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const getPurchaseSlice = createSlice({
  name: "purchase",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPurchase.pending, (state) => {
      state.isLoading = true;
      console.log("pending state");
    });
    builder.addCase(getPurchase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.purchase = action.payload.purchases;
      state.message = action.payload.message;
      console.log("fulfilled state", state.message);
    });
    builder.addCase(getPurchase.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Rejected error payload:", action.payload);
      console.log("Rejected error object:", action.error);
    });
  },
});

export default getPurchaseSlice.reducer;
export { getPurchase };

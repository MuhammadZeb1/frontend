import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";

const initialState = {
  purchase: [],
  isLoading: false,
  error: null,
  message: null,
};
const getVendorPurchase = createAsyncThunk(
  "Vendorpurchase/getVendorPurchase",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/purchase/vendorPurchase");
      console.log("API response:", response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const getVendorPurchaseSlice = createSlice({
  name: "purchase",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getVendorPurchase.pending, (state) => {
      state.isLoading = true;
      console.log("pending state");
    });
    builder.addCase(getVendorPurchase.fulfilled, (state, action) => {
      state.isLoading = false;
      state.purchase = action.payload.purchases;
      state.message = action.payload.message;
      console.log("fulfilled state", state.message);
    });
    builder.addCase(getVendorPurchase.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Rejected error payload:", action.payload);
      console.log("Rejected error object:", action.error);
    });
  },
});

export default getVendorPurchaseSlice.reducer;
export { getVendorPurchase };

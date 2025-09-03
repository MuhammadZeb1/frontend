import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const getVendorProducts = createAsyncThunk(
  "vendor/getVendorProducts",
  async (vendorId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/vendor/vendors/${vendorId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const vendorProductSlice = createSlice({
  name: "vendorProducts",
  initialState: {
    vendor: null,
    products: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendorProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getVendorProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendor = action.payload.vendor;
        state.products = action.payload.products;
        state.message = "Vendor products fetched successfully ✅";
        toast.success(state.message);
      })
      .addCase(getVendorProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch vendor products";
        toast.error(state.error);
      });
  },
});

export default vendorProductSlice.reducer;

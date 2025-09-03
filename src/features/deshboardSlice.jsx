import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";

const initialState = {
  vendors: [],
  isLoading: false,
  error: null,
  message: null,
};

// ✅ async thunk for vendors
export const getVendor = createAsyncThunk(
  "vendor/getVendor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vendor/vendors");
      return response.data; // {status, data: [...vendors]}
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const getVendorsSlice = createSlice({
  name: "getVendors",
  initialState,
  reducers: {}, // no manual reducers needed yet
  extraReducers: (builder) => {
    builder
      .addCase(getVendor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Fetching vendors...");
      })
      .addCase(getVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vendors = action.payload.data; // ✅ API میں vendors "data" key میں آئے ہیں
        state.message = "Vendors fetched successfully";
        console.log("Vendors:", state.vendors);
      })
      .addCase(getVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch vendors";
        console.log("Error fetching vendors:", state.error);
      });
  },
});

export default getVendorsSlice.reducer;

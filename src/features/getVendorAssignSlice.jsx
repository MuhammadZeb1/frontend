import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";



const initialState = {
  deliveries: [],
  isLoading: false,
  error: null,
  message: null,
};

// ✅ Thunk — Get Vendor Deliveries
export const getVendorDeliveries = createAsyncThunk(
  "vendor/getVendorDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/deliveryAssignment/vendor/deliveries");
      return response.data; // backend returns array of deliveries
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Slice
const getVendorDeliveriesSlice = createSlice({
  name: "vendorDeliveries",
  initialState,
  reducers: {
    clearVendorDeliveries: (state) => {
      state.deliveries = [];
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVendorDeliveries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getVendorDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliveries = action.payload;
        state.message = "Deliveries fetched successfully";
      })
      .addCase(getVendorDeliveries.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch vendor deliveries";
      });
  },
});

export const { clearVendorDeliveries } = getVendorDeliveriesSlice.actions;
export default getVendorDeliveriesSlice.reducer;

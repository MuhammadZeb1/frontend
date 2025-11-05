import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// ✅ Async Thunk — Fetch deliveries for delivery boy
export const getDeliveryBoyDeliveries = createAsyncThunk(
  "deliveryBoyDeliveries/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/deliveryAssignment/deliveryBoy");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch delivery boy deliveries"
      );
    }
  }
);

// ✅ Slice
const deliveryBoyDeliveriesSlice = createSlice({
  name: "deliveryBoyDeliveries",
  initialState: {
    deliveries: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryBoyDeliveries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDeliveryBoyDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliveries = action.payload;
      })
      .addCase(getDeliveryBoyDeliveries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default deliveryBoyDeliveriesSlice.reducer;

// src/redux/deliverySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";

const initialState = {
  deliveries: [],
  isLoading: false,
  error: null,
  message: null,
};

// ✅ async thunk for deliveries
export const getDeliveries = createAsyncThunk(
  "delivery/getDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/allDelivery/getDelivery");
      return response.data; // { deliveries: [...] }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log("Fetching delivery users...");
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliveries = action.payload.deliveries; // ✅ API سے "deliveries" key آ رہا ہے
        state.message = "Delivery users fetched successfully";
        console.log( state.deliveries);

        console.log("Deliveries:", state.deliveries);
      })
      .addCase(getDeliveries.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload?.message || "Failed to fetch deliveries";
        console.log("Error fetching deliveries:", state.error);
      });
  },
});

export default deliverySlice.reducer;

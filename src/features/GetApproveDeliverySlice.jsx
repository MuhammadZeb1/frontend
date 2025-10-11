import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";

const initialState = {
  deliveries: [],
  isLoading: false,
  error: null,
  message: null,
};

const getApproveDelivery = createAsyncThunk(
  "delivery/getApproveDelivery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/allDelivery/approved");
      console.log("API Response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const getApproveDeliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApproveDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApproveDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deliveries = action.payload;

        console.log("State Deliveries:", state.deliveries);
      })
      .addCase(getApproveDelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        F;
      });
  },
});

export default getApproveDeliverySlice.reducer;
export { getApproveDelivery };

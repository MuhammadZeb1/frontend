import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorPurchases: [],
  loading: false,
  error: null,
};

export const fetchVendorPurchases = createAsyncThunk(
  "vendorPurchases/fetchVendorPurchases",
  async (vendorId, { rejectWithValue }) => {    
    try {
        const response = await fetch(`/api/vendor/${vendorId}/purchases`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);                
export const vendorPurchasesSlice = createSlice({
  name: "vendorPurchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorPurchases = action.payload;
      })
      .addCase(fetchVendorPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },                
});                
export default vendorPurchasesSlice.reducer;                

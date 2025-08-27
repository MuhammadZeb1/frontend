import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";
const initialState = {
    product : [],
    isLoading :false,
    error:null
}


   const getProduct = createAsyncThunk(
  "product/getproduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/products");
      return response.data; // یہاں پورا object واپس ہوگا {message, data}
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const readProductSlice = createSlice({
    name :"readProduct",
    initialState,
    extraReducers :(builder)=>{
        builder.addCase(getProduct.pending,(state)=>{
            state.isLoading = true
            console.log("pending state");
        })
        builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.product = action.payload.products
            console.log("action",action.payload.message)
        })
        builder.addCase(getProduct.rejected,(state)=>{
            state.isLoading = false
        })
    }


})

export default readProductSlice.reducer
export {getProduct}
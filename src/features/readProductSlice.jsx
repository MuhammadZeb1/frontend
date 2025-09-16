import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";
const initialState = {
    product : [],
    isLoading :false,
    error:null,
    message :null,
    ali:"ali"
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
            state.message = action.payload.message
            console.log("fulfilled state",state.message);
        })
        builder.addCase(getProduct.rejected,(state)=>{
            state.isLoading = false
            state.error = action.payload?.message || "Something went wrong";
            console.log("Error message:", state.error)
        })
    }


})

export default readProductSlice.reducer
export {getProduct}
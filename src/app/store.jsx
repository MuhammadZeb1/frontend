import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice.jsx";
import readProductReducer from "../features/readProductSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: readProductReducer, 
  }
});

export default store;

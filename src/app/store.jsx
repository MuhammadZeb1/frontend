import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice.jsx";
import readProductReducer from "../features/readProductSlice.jsx";
import getVendorReducer from "../features/deshboardSlice.jsx"
import getVendorProductReducer from "../features/vendorProductsSlice.jsx"
import getPruchaseReducer from "../features/purchaseSlice.jsx"


export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: readProductReducer, 
    vendors: getVendorReducer, 
    vendorProduct: getVendorProductReducer,
    purchase: getPruchaseReducer,
  }
});

export default store;

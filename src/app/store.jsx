import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice.jsx";
import readProductReducer from "../features/readProductSlice.jsx";
import getVendorReducer from "../features/deshboardSlice.jsx"
import getVendorProductReducer from "../features/vendorProductsSlice.jsx"
import getPruchaseReducer from "../features/purchaseSlice.jsx"
import getAllProductsReducer from "../features/GetProductsSlice.jsx";
import getVendorPurchaseReducer from "../features/GetVendorPurchaseSlice.jsx";



export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product: readProductReducer, 
    vendors: getVendorReducer, 
    vendorProduct: getVendorProductReducer,
    purchase: getPruchaseReducer,
    allProducts:getAllProductsReducer,
    vendorPurchase:getVendorPurchaseReducer


  }
});

export default store;

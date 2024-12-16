import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import addProductReducer from "./slices/addProduct";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    addProduct: addProductReducer,
  },
});

export default store;

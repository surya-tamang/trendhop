import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import addProductReducer from "./slices/addProduct";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    addProduct: addProductReducer,
  },
});

export default store;

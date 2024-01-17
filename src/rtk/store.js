import { configureStore } from "@reduxjs/toolkit";
import sliderSlice from "./slices/sliderSlice";
// import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    slider: sliderSlice,
    // products: productSlice,
    cart: cartSlice,
  },
});

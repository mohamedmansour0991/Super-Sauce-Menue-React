import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    count: 0,
    totalPrice: +JSON.parse(localStorage.getItem("totalPrice")) || 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      console.log(action.payload);
      const findProduct = state.cart.find(
        (e) => e.id === product.id && e.name === product.name
      );
      console.log(findProduct);
      if (findProduct) {
        state.count++;
        findProduct.count++;
        state.totalPrice += +product.price;
        findProduct.totalPrice += product.price;
      } else {
        if (product.discount_percentage) {
          state.totalPrice += +product.price_after_discount;
          state.cart.push({
            id: product.id,
            name: product.name,
            size: product.size,
            price_after_discount: product.price_after_discount,
            price: +product.price,
            discount_percentage: product.discount_percentage,
            count: 1,
            img: product?.product_image[0]?.path,
            dec: product.product_name,
            totalPrice: +product.price_after_discount,
          });
        } else {
          state.totalPrice += +product.price;
          state.cart.push({
            id: product.id,
            name: product.name,
            size: product.size,
            color: product.color,
            price: +product.price,
            dec: product.description,
            img: product?.image[0]?.path,
            count: 1,
            totalPrice: +product.price,
          });
        }
      }
      console.log(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeProduct: (state, action) => {
      const products = state.cart.filter(
        (e) => e.id !== action.payload.id && e.name !== action.payload.name
      );
      state.totalPrice -= action.payload.price * action.payload.count;
      state.cart = products;
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    decrese: (state, action) => {
      const findProduct = state.cart.find((e) => e.id === action.payload.id);
      if (findProduct.price_after_discount) {
        if (findProduct.count == 1) {
          // const products = state.cart.filter((e) => e.id !== action.payload.id);
          // state.totalPrice -= action.payload.price_after_discount;
          // findProduct.totalPrice -= action.payload.price_after_discount;
          // state.cart = products;
        } else {
          findProduct.count--;
          state.totalPrice -= +action.payload.price_after_discount;
          findProduct.totalPrice -= +action.payload.price_after_discount;
        }
      } else {
        if (findProduct.count == 1) {
          // const products = state.cart.filter((e) => e.id !== action.payload.id);
          // state.totalPrice -= action.payload.price;
          // findProduct.totalPrice -= action.payload.price;
          // state.cart = products;
        } else {
          findProduct.count--;
          state.totalPrice -= +action.payload.price;
          findProduct.totalPrice -= +action.payload.price;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    increse: (state, action) => {
      console.log(action.payload);
      console.log(state.cart);
      const findProduct = state.cart.find((e) => e.id === action.payload.id);
      console.log(findProduct);
      if (findProduct.price_after_discount) {
        findProduct.count++;
        state.totalPrice += +action.payload.price_after_discount;
        findProduct.totalPrice += +action.payload.price_after_discount;
      } else {
        const findProduct = state.cart.find((e) => e.id === action.payload.id);
        console.log(findProduct);
        findProduct.count++;
        state.totalPrice += +action.payload.price;
        findProduct.totalPrice += +action.payload.price;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeAllProduct: (state, action) => {
      state.cart = [];
      state.totalPrice = 0;

      localStorage.removeItem("totalPrice");
    },
  },
});

export const { addToCart, removeProduct, decrese, increse, removeAllProduct } =
  cartSlice.actions;
export default cartSlice.reducer;

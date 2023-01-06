import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import type { NewRootState as RootState } from '../store';
import { CartItem } from './cart.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    setIsCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const { setCartItems, setIsCartOpen } = cartSlice.actions;

export const selectIsCartOpen = (state: RootState) => {
  return state.cart.isCartOpen;
};

export const selectCartItems = (state: RootState) => {
  return state.cart.cartItems;
};

export const selectCartCount = (state: RootState) => {
  return state.cart.cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
};

export const selectCartTotal = (state: RootState) => {
  return state.cart.cartItems.reduce(
    (totalCost, cartItem) => totalCost + cartItem.quantity * cartItem.price,
    0
  );
};

export default cartSlice.reducer;

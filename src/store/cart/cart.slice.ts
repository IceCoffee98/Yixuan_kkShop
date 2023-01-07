import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { CartItem, CartState } from './cart.types';
import type { CategoryItem } from '../category/category.types';

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

const selectCartReducer = (state: RootState) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (selectCartReducer) => selectCartReducer.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (selectCartReducer) => selectCartReducer.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (selectCartItems) =>
  selectCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (selectCartItems) =>
  selectCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = getArrayAfterAddToCartItems(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToDecrease: CategoryItem) => {
  const newCartItems = getArrayAfterRemoveFromCartItems(cartItems, productToDecrease);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CategoryItem) => {
  const newCartItems = getArrayAfterClearFromCartItems(cartItems, productToClear);
  return setCartItems(newCartItems);
};

export default cartSlice.reducer;

function getArrayAfterAddToCartItems(
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] {
  // 1.find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  // 2.if found, increment quantity
  // ps: we should always create a new object rather than directly modify the "cartItems" which is imutable
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // 3.return new array with modified cartitems w/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function getArrayAfterRemoveFromCartItems(
  cartItems: CartItem[],
  productToDecrease: CategoryItem
): CartItem[] {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

function getArrayAfterClearFromCartItems(
  cartItems: CartItem[],
  productToClear: CategoryItem
): CartItem[] {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}

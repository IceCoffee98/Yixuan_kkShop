import { CategoryItem } from '../category/category.types';

import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from '../../utils/reducer/reducer.util';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const getArrayAfterAddToCartItems = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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
};

const getArrayAfterRemoveFromCartItems = (
  cartItems: CartItem[],
  productToDecrease: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const getArrayAfterClearFromCartItems = (
  cartItems: CartItem[],
  productToClear: CategoryItem
): CartItem[] => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((opened: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, opened)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
  const newCartItems = getArrayAfterAddToCartItems(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToDecrease: CategoryItem
): SetCartItems => {
  const newCartItems = getArrayAfterRemoveFromCartItems(cartItems, productToDecrease);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CategoryItem
): SetCartItems => {
  const newCartItems = getArrayAfterClearFromCartItems(cartItems, productToClear);
  return setCartItems(newCartItems);
};

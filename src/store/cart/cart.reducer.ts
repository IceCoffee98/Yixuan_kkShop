import { AnyAction } from 'redux';
import { setCartItems, setIsCartOpen } from './cart.action';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const CartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }
  return state;
};
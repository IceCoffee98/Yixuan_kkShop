import { type } from '@testing-library/user-event/dist/type';
import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.util';

const getArrayAfterAddToCartItems = (cartItems, productToAdd) => {
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

const getArrayAfterRemoveFromCartItems = (cartItems, productToDecrease) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id);
  if (!existingCartItem) return;
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDecrease.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const getArrayAfterClearFromCartItems = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    default:
      return new Error(`Unhandled type ${type} in CartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CartContext = createContext({
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeAllItemFromCart: () => {},
  ...INITIAL_STATE,
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, total } = state;

  const setIsCartOpen = (isOpen) => {
    // dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isOpen });
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen));
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((count, cartItem) => count + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce(
      (totalCost, cartItem) => totalCost + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        total: newCartTotal,
      })
    );
    // dispatch({
    //   type: CART_ACTION_TYPES.SET_CART_ITEMS,
    //   payload: {
    //     cartItems: newCartItems,
    //     cartCount: newCartCount,
    //     total: newCartTotal,
    //   },
    // });
  };

  // the following method are provided in the context
  const addItemToCart = (productToAdd) => {
    const newCartItems = getArrayAfterAddToCartItems(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToDecrease) => {
    const newCartItems = getArrayAfterRemoveFromCartItems(cartItems, productToDecrease);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = getArrayAfterClearFromCartItems(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
  };
  // console.log(value);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

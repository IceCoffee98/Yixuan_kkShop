import { createContext, useState, useEffect } from 'react';

const addToCartItems = (cartItems, productToAdd) => {
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

const removeFromCartItems = (cartItems, productToDecrease) => {
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

const clearFromCartItems = (cartItems, productToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  removeAllItemFromCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItemToCart = (productToAdd) => setCartItems(addToCartItems(cartItems, productToAdd));

  const removeItemFromCart = (productToDecrease) =>
    setCartItems(removeFromCartItems(cartItems, productToDecrease));

  const clearItemFromCart = (productToClear) =>
    setCartItems(clearFromCartItems(cartItems, productToClear));

  // althouth their dependency are the same, seperate them for better reading
  useEffect(() => {
    setCartCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotal(
      cartItems.reduce((totalCost, cartItem) => totalCost + cartItem.quantity * cartItem.price, 0)
    );
  }, [cartItems]);

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

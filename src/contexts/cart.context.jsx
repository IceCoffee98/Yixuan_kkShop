import { createContext, useState, useEffect } from 'react';

const addToCartItems = (cartItems, productToAdd) => {
  // 1.find if cartItems contains productToAdd
  const existed = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  // 2.if found, increment quantity
  // ps: we should always create a new object rather than directly modify the "cartItems" which is imutable
  if (existed) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // 3.return new array with modified cartitems w/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addToCartItems(cartItems, productToAdd));
  };

  useEffect(() => {
    setCartCount(cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0));
  }, [cartItems]);

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
  // console.log(value);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import { useState, useEffect, createContext } from 'react';
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  // console.log(PRODUCTS);

  const [products, setProducts] = useState(PRODUCTS);
  // useEffect(() => {}, []);
  const value = { products };
  // console.log(value);
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

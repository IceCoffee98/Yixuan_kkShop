import { useState, useEffect, createContext } from 'react';
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
  categories: new Map(),
});

export const CategoriesProvider = ({ children }) => {
  // console.log(PRODUCTS);

  // initialize once to upload SHOP_DATA into db
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocuments(new Map());
      setCategoriesMap(categoryMap);
    })();
  }, []);

  // useEffect(() => {}, []);
  const value = { categoriesMap };
  // console.log(value);
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};

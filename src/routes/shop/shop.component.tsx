import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// import { setCategories } from '../../store/category/category.action';

import { fetchCategoryStart } from '../../store/category/category.action';

const Shop = () => {
  // we only have one dispatch instance;
  const dispatch = useDispatch();
  useEffect(() => {
    // (async () => {
    //   const category = await getCategoriesAndDocuments();
    //   dispatch(setCategories(category));
    // })();
    // dispatch(fetchCategoriesAsync());
    dispatch(fetchCategoryStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;

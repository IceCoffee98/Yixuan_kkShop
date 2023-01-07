import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { CategoryMap, CategoryState, Category } from './category.types';

export const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoryStart: (state) => {
      state.isLoading = true;
    },
    fetchCategorySuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchCategoryFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailed } =
  categorySlice.actions;

const selectCategoriesReducer = (state: RootState): CategoryState => state.category;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export default categorySlice.reducer;

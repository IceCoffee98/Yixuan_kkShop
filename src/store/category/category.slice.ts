import { AnyAction } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from './category.types';
import type { RootState } from '../store';
import { CategoryMap } from './category.types';

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

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

export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategoriesMap = (state: RootState) =>
  state.category.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap);

export const selectCategoriesIsLoading = (state: RootState) => state.category.isLoading;

export default categorySlice.reducer;

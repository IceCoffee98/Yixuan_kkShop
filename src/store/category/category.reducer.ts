import { AnyAction } from 'redux';
import { Category } from './category.types';

import {
  CategoryAction,
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailed,
} from './category.action';

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // action = {} as CategoryiesAction
  action: AnyAction
): CategoryState => {
  if (fetchCategoryStart.match(action)) {
    console.log(fetchCategoryStart.type);
    return { ...state, isLoading: true };
  }

  if (fetchCategorySuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoryFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};

import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoryStart, fetchCategorySuccess, fetchCategoryFailed } from './category.slice';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArr = yield* call(getCategoriesAndDocuments, 'categories');
    yield* put(fetchCategorySuccess(categoriesArr));
  } catch (error) {
    yield* put(fetchCategoryFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(fetchCategoryStart.type, fetchCategoriesAsync);
}

export function* categoriesSagas() {
  yield* all([call(onFetchCategories)]);
}

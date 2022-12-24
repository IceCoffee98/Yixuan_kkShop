import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategorySuccess, fetchCategoryFailed } from './category.action';

import { CATEGORY_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    const categoriesArr = yield call(getCategoriesAndDocuments, 'categories');
    yield put(fetchCategorySuccess(categoriesArr));
  } catch (err) {
    yield put(fetchCategoryFailed(err));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START, fetchCategoriesAsync);
}

export function* categoriesSagas() {
  yield all([call(onFetchCategories)]);
}

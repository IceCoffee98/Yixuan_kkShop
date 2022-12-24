import { all, call } from 'typed-redux-saga/macro';
import { categoriesSagas } from './category/category.saga';
import { userSagas } from './user/user.saga';

export function* rootSaga() {
  yield* all([call(categoriesSagas), call(userSagas)]);
}

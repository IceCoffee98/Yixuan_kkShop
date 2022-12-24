import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from '../../utils/reducer/reducer.util';
import { CATEGORY_ACTION_TYPES, Category } from './category.types';

export type FetchCategoryStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START>;
export type FetchCategorySuccess = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
  Category[]
>;

export type FetchCategoryFailed = ActionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAIL,
  Error
>;

export type CategoryAction = FetchCategoryStart | FetchCategorySuccess | FetchCategoryFailed;

export const fetchCategoryStart = withMatcher(
  (): FetchCategoryStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_START)
);

export const fetchCategorySuccess = withMatcher(
  (categoriesArr: Category[]): FetchCategorySuccess =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, categoriesArr)
);

export const fetchCategoryFailed = withMatcher(
  (error: Error): FetchCategoryFailed =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORY_FAIL, error)
);

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArr = await getCategoriesAndDocuments('categories');
//     dispatch(fetchCategoriesSuccess(categoriesArr));
//   } catch (error) {
//     dispatch(fetchCategoriesFail(error));
//   }
// };

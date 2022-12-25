export enum CATEGORY_ACTION_TYPES {
  FETCH_CATEGORY_START = 'categories/FETCH_CATEGORIES_START',
  FETCH_CATEGORY_SUCCESS = 'categories/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORY_FAIL = 'categories/FETCH_CATEGORIES_FAIL',
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
  route: string;
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

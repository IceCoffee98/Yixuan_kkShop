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

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

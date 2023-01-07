import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { useAppSelector } from '../../store/hooks';
import { CategoryContainer, Title } from './category.styles';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/category/category.slice';

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const categoriesIsLoading = useAppSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {/* fetching products is async, make sure to render product when they are availiable */}
      {categoriesIsLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;

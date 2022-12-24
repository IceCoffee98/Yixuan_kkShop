import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/category/category.selector';
// import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, Title } from './category.styles';

// enforce the 'category' exists
type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  // console.log('render/re-render category component');

  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
  // const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  // console.log(category);

  // ensure category changes only when category and map change
  useEffect(() => {
    setProducts(categoriesMap[category]);
    // console.log('setProduct Effect() called');
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

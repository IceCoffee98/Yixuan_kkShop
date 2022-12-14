import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, Title } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  // console.log(category);

  // ensure category changes only when category and map change
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {/* fetching products is async, make sure to render product when they are availiable */}
        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </CategoryContainer>
    </>
  );
};

export default Category;

import { FC } from 'react';
import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';
import { CategoryItem } from '../../store/category/category.types';
type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};
const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h1>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h1>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

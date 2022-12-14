import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/category.slice';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <div className='categories-container'>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
      ))}
    </div>
  );
};

export default CategoriesPreview;

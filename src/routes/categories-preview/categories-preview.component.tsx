import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { CategoriesContext } from '../../contexts/categories.context';
import { selectCategoriesMap } from '../../store/category/category.selector';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className='categories-container'>
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
      ))}
    </div>
  );
};

export default CategoriesPreview;

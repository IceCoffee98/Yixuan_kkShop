import { FC } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItems, addItemToCart } from '../../store/cart/cart.slice';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCartContainer, Footer, Name, Price } from './product-card.styles';
import type { CategoryItem } from '../../store/category/category.types';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

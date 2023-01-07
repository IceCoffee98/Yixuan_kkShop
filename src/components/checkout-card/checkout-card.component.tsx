import { FC, memo } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import {
  selectCartItems,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.slice';

import {
  CheckoutCardContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-card.styles';

import type { CartItem } from '../../store/cart/cart.types';

type CheckoutCardProps = {
  cartItem: CartItem;
};

const CheckoutCard: FC<CheckoutCardProps> = memo(({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const incrementQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
  const decrementQuantity = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const removeAll = () => dispatch(clearItemFromCart(cartItems, cartItem));
  return (
    <CheckoutCardContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={decrementQuantity}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementQuantity}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={removeAll}>&#10005;</RemoveButton>
    </CheckoutCardContainer>
  );
});

export default CheckoutCard;

import { useContext, FC, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
// import { CartContext } from '../../contexts/cart.context';
import {
  CheckoutCardContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-card.styles';
import { CartItem } from '../../store/cart/cart.types';
type CheckoutCardProps = {
  cartItem: CartItem;
};
const CheckoutCard: FC<CheckoutCardProps> = memo(({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();
  // const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);

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

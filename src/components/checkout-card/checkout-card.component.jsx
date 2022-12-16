import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
  CheckoutCardContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-card.styles';

const CheckoutCard = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
  const incrementQuantity = () => addItemToCart(cartItem);
  const decrementQuantity = () => removeItemFromCart(cartItem);
  const removeAll = () => clearItemFromCart(cartItem);
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
};

export default CheckoutCard;

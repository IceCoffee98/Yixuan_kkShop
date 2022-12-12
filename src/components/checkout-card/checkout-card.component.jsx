import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-card.styles.scss';

const CheckoutCard = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
  const incrementQuantity = () => addItemToCart(cartItem);
  const decrementQuantity = () => removeItemFromCart(cartItem);
  const removeAll = () => clearItemFromCart(cartItem);
  return (
    <div className='checkout-card-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>

      <span className='quantity'>
        <div className='arrow' onClick={decrementQuantity}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={incrementQuantity}>
          &#10095;
        </div>
      </span>

      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeAll}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutCard;

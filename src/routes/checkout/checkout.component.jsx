import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutCard from '../../components/checkout-card/checkout-card.component';

import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);
  return (
    <div className='checkout-container'>
      <header className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </header>
      {cartItems.map((cartItem) => (
        <CheckoutCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className='total'>Total: ${total}</span>
    </div>
  );
};

export default Checkout;

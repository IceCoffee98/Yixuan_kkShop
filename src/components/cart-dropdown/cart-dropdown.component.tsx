import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartContext } from '../../contexts/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  // const { cartItems } = useContext(CartContext);
  // const [temp, setTemp] = useState('A');
  const navigate = useNavigate();
  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
    // console.log(temp);
  }, []);

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
      {/* <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={() => setTemp('B')}> */}
      {/* UPDATE */}
      {/* </Button> */}
    </CartDropDownContainer>
  );
};

export default CartDropdown;

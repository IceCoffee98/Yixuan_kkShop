import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { selectCartItems } from '../../store/cart/cart.slice';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
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
    </CartDropDownContainer>
  );
};

export default CartDropdown;

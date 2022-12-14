import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ShoppingIcon, ShoppingIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const { cartItems, isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <ShoppingIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </ShoppingIconContainer>
  );
};

export default CartIcon;

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsCartOpen, selectCartCount, setIsCartOpen } from '../../store/cart/cart.slice';
import { ShoppingIcon, ShoppingIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
  const cartCount = useAppSelector(selectCartCount);
  const isCartOpen = useAppSelector(selectIsCartOpen);

  const dispatch = useAppDispatch();
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <ShoppingIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </ShoppingIconContainer>
  );
};

export default CartIcon;

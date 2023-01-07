import CheckoutCard from '../../components/checkout-card/checkout-card.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { useAppSelector } from '../../store/hooks';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.slice';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutCard key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${total}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;

import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';
import { selectCurrentUser } from '../../store/user/user.selector.ts';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
// import { CartContext } from '../../contexts/cart.context';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
// import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import Footer from '../../components/footer/footer.component';
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  UserNameLabel,
} from './navigation.styles.jsx';

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(UserContext);
  // the selector updates whenever the state object changes
  // const { isCartOpen } = useContext(CartContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());
  // console.log(currentUser);

  // console.log('Navigation Component Hit!!!');
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
          <h1>Yixuan's k&k</h1>
        </LogoContainer>
        <NavLinksContainer>
          {currentUser ? (
            <>
              <UserNameLabel>
                Hello, {currentUser.displayName ? currentUser.displayName : 'welcome'} !
              </UserNameLabel>
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            </>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <NavLink to='/shop'>SHOP</NavLink>
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Navigation;

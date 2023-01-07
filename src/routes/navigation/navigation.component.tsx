import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import Footer from '../../components/footer/footer.component';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { signOutStart, selectCurrentUser } from '../../store/user/user.slice';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectIsCartOpen } from '../../store/cart/cart.slice';

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  UserNameLabel,
  MainContentContainer,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());

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
      <MainContentContainer>
        <Outlet />
      </MainContentContainer>
      <Footer />
    </Fragment>
  );
};

export default Navigation;

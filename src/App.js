import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';

import { setCurrentUser } from './store/user/user.action';

const App = () => {
  // we only have one dispatch instance;
  const dispatch = useDispatch();
  useEffect(() => {
    // when mounted, run it once immediately
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // actually specify for google login which
        createUserDocumentFromAuth(user);
      }
      // console.log(user);
      dispatch(setCurrentUser(user));
    });
    // console.log(unsubscribe);
    return unsubscribe; // useEffect will run whatever returns from its callback;
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path='shop/*' element={<Shop />}></Route>
        <Route path='auth' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

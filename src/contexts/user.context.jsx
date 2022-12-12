import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // when mounted, run it once immediately
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // actually specify for google login which
        createUserDocumentFromAuth(user);
      }
      // console.log(user);
      setCurrentUser(user);
    });
    // console.log(unsubscribe);
    return unsubscribe; // useEffect will run whatever returns from its callback;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

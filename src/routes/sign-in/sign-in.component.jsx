import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirct,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  useEffect(() => {
    // const response = getRedirectResult(auth);
    getRedirectResult(auth)
      .then(({ user }) => {
        console.log(user);
        return createUserDocumentFromAuth(user);
      })
      .then((userDocRef) => {
        console.log(userDocRef);
      });
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(response);
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirct}>Sign in with Google Redirect</button>
    </div>
  );
};

export default SignIn;

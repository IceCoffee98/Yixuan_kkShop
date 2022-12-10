import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirct,
} from '../../utils/firebase/firebase.utils';

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  // console.log(response);
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log(userDocRef);
};

const SignIn = () => {
  // useEffect(() => {
  //   // const response = getRedirectResult(auth);
  //   getRedirectResult(auth)
  //     .then(({ user }) => createUserDocumentFromAuth(user))
  //     .then((userDocRef) => console.log(userDocRef));
  // }, []);

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirct}>Sign in with Google Redirect</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

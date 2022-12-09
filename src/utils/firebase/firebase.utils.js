// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCULi4QAPThgu40O5AMqF1a0J4efx5MKQk',
  authDomain: 'crwn-clothing-db-7ce40.firebaseapp.com',
  projectId: 'crwn-clothing-db-7ce40',
  storageBucket: 'crwn-clothing-db-7ce40.appspot.com',
  messagingSenderId: '579246671872',
  appId: '1:579246671872:web:8cf2299257b9000cfe70e5',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// you can have multiple different providers: Google, Facebook,....
const googleSignInProvider = new GoogleAuthProvider();

googleSignInProvider.setCustomParameters({
  prompt: 'select_account',
});

// a singleton in this website
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleSignInProvider);
export const signInWithGoogleRedirct = () => signInWithRedirect(auth, googleSignInProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  //   console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());
};

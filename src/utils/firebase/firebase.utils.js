// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  pathField = 'title'
) => {
  const collectionRef = collection(db, collectionKey);

  // in order to add all docs successfully into db, we need to create a batch
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj[pathField].toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const qry = query(collectionRef);

  const querySnapshot = await getDocs(qry);

  // 1. actually we want pull the base form of data, but we have done a scaffolding here.
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;

  //2. return the pure data instead, scaffold them later
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
};

export const createUserDocumentFromAuth = async (userAuth, otherInfos) => {
  if (!userAuth) return;
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
        ...otherInfos,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

// opening permanently listener for changes once mounterd
export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  return onAuthStateChanged(auth, callback);
};

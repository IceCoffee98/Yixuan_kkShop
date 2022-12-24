// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Category } from '../../store/category/category.types';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
  DocumentSnapshot,
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
export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);

  // in order to add all docs successfully into db, we need to create a batch
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
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
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const getUserSnapShotFromDocByAuth = async (
  userAuth: User,
  otherInfos: AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating the user', error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

// opening permanently listener for changes once mounterd
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  if (!callback) return;
  return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  signUpSuccess,
  googleSignInStart,
  checkUserSession,
  emailSignInStart,
  signUpStart,
  signOutStart,
} from './user.slice';

import {
  getCurrentUser,
  getUserSnapShotFromDocByAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';

import type { User } from 'firebase/auth';
import type { AdditionalInformation } from '../../utils/firebase/firebase.utils';
import type { SignUpStart, EmailSignInStart, SignUpSuccess } from './user.types';

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapShot = yield* call(getUserSnapShotFromDocByAuth, userAuth, additionalDetails);
    if (userSnapShot) {
      yield* put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail(action: PayloadAction<EmailSignInStart>) {
  const { email, password } = action.payload;
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: PayloadAction<SignUpStart>) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess({ user, additionalDetails: { displayName } }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: PayloadAction<SignUpSuccess>) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart.type, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart.type, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(signUpStart.type, signUp);
}

export function* onSignInAfterSignUp() {
  yield* takeLatest(signUpSuccess.type, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(signOutStart, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignInAfterSignUp),
    call(onSignOutStart),
  ]);
}

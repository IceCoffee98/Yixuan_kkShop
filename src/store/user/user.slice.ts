import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { AdditionalInformation, UserData } from '../../utils/firebase/firebase.utils';
import { USER_ACTION_TYPES } from './user.types';
import { User } from 'firebase/auth';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export type EmailSignInStart = {
  email: string;
  password: string;
};

export type SignUpStart = EmailSignInStart & {
  displayName: string;
};

export type SignUpSuccess = {
  user: User;
  additionalDetails: AdditionalInformation;
};

export const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    signUpFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    signOutFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    signInSuccess: (state, action: PayloadAction<UserData & { id: string }>) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    googleSignInStart() {},
    checkUserSession() {},
    emailSignInStart(_, action: PayloadAction<EmailSignInStart>) {},
    signUpSuccess(_, action: PayloadAction<SignUpSuccess>) {},
    signUpStart(_, action: PayloadAction<SignUpStart>) {},
    signOutStart() {},
  },
});

export const {
  signOutFailed,
  signInFailed,
  signUpFailed,
  signInSuccess,
  signOutSuccess,
  googleSignInStart,
  checkUserSession,
  emailSignInStart,
  signUpSuccess,
  signUpStart,
  signOutStart,
} = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;

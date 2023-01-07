import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { UserData } from '../../utils/firebase/firebase.utils';
import type { UserState, EmailSignInStart, SignUpStart, SignUpSuccess } from './user.types';

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
    googleSignInStart: () => {},
    checkUserSession: () => {},
    emailSignInStart: (_, action: PayloadAction<EmailSignInStart>) => {},
    signUpSuccess: (_, action: PayloadAction<SignUpSuccess>) => {},
    signUpStart: (_, action: PayloadAction<SignUpStart>) => {},
    signOutStart: () => {},
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

const selectUserReducer = (state: RootState) => state.user;
export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (selectUserReducer) => selectUserReducer.currentUser
);

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { NewRootState as RootState } from '../store';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
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
    signInSuccess: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signOutFailed, signInFailed, signUpFailed, signInSuccess, signOutSuccess } =
  userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;

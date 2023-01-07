import type { UserData } from '../../utils/firebase/firebase.utils';
import type { User } from 'firebase/auth';
import type { AdditionalInformation } from '../../utils/firebase/firebase.utils';

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

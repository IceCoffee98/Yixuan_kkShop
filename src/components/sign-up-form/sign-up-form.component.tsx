import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import {
  createAuthUserWithEmailAndPassword,
  getUserSnapShotFromDocByAuth,
} from '../../utils/firebase/firebase.utils';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { UserContext } from '../../contexts/user.context';
import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.slice';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    // we do not want the default behavior of the form.
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    try {
      // const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      // user.updateProfile({ displayName });
      // getUserSnapShotFromDocByAuth(user, { displayName });
      dispatch(signUpStart({ email, password, displayName }));

      resetFormFields();
      navigate('/');
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, the email is already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          onChange={changeHandler}
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          onChange={changeHandler}
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          onChange={changeHandler}
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
          onChange={changeHandler}
          value={confirmPassword}
        />
        <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.base}>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

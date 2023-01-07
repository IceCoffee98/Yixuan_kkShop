import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import FormInput from '../form-input/form-input.component';
import { useAppDispatch } from '../../store/hooks';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, SignUpLink, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.slice';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultInputFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState(defaultInputFields);
  const { email, password } = inputFields;

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
    navigate('/');
  };

  const onChangeHander = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const resetInputFields = () => {
    setInputFields(defaultInputFields);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart({ email, password }));
      navigate('/');
      resetInputFields();
    } catch (error) {
      const errorCode = (error as AuthError).code;
      if (errorCode === AuthErrorCodes.INVALID_PASSWORD) {
        alert('incorrect password for email');
      } else if (errorCode === AuthErrorCodes.USER_DELETED) {
        alert('no user associated with this email');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <SignInContainer>
      <form onSubmit={onSubmitHandler}>
        <h1>I already have an account</h1>
        <div>
          Don't have account yet?
          <SignUpLink to='/auth/sign-up'> Create Account</SignUpLink>
        </div>
        <span>Sign in with your email and password</span>

        <FormInput
          label='email'
          type='email'
          required
          name='email'
          onChange={onChangeHander}
          value={email}
        />
        <FormInput
          label='password'
          type='password'
          required
          name='password'
          onChange={onChangeHander}
          value={password}
        />

        <ButtonsContainer>
          <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.base}>
            SIGN IN
          </Button>
          {/* the default button type is submit, so we need manually set the button type */}
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
            <FontAwesomeIcon icon={faGoogle} />
            &nbsp; SIGN IN WITH GOOGLE
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

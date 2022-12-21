import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';
import { SignInContainer, SignUpLink, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import {
  signInWithGooglePopup,
  getUserSnapShotFromDocByAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const defaultInputFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState(defaultInputFields);
  // const { setCurrentUser } = useContext(UserContext);
  const { email, password } = inputFields;
  // console.log('Sign In Form');
  const logGoogleUser = async () => {
    // const { user } = await signInWithGooglePopup();
    dispatch(googleSignInStart());
    // console.log(response);
    // const userDocRef = await createUserDocumentFromAuth(user);
    // console.log(userDocRef);
    navigate('/');
  };
  const onChangeHander = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const resetInputFields = () => {
    setInputFields(defaultInputFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      dispatch(emailSignInStart(email, password));
      navigate('/');
      resetInputFields();
    } catch (error) {
      // if the email has not been signed up,
      // Error (auth/user-not-found):
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password for email');
      } else if (error.code === 'auth/user-not-found') {
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

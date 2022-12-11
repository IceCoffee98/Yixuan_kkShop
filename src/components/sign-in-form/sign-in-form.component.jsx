import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';
import './sign-in-form.styles.scss';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const defaultInputFields = {
  email: '',
  password: '',
};

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  // console.log(response);
  // const userDocRef = await createUserDocumentFromAuth(user);
  // console.log(userDocRef);
};
const SignInForm = () => {
  const [inputFields, setInputFields] = useState(defaultInputFields);
  // const { setCurrentUser } = useContext(UserContext);
  const { email, password } = inputFields;
  // console.log('Sign In Form');

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
      await signInAuthUserWithEmailAndPassword(email, password);
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
    <div className='sign-up-container'>
      <form onSubmit={onSubmitHandler}>
        <h1>I already have an account</h1>
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
        <div className='buttons-container'>
          <Button type='submit'>SIGN IN</Button>
          {/* the default button type is submit, so we need manually set the button type */}
          <Button type='button' buttonType='google' onClick={logGoogleUser}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

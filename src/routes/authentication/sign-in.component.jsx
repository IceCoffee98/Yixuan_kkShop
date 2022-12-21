import { ReactComponent as BeachSvg } from '../../assets/beach.svg';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles';

const SignIn = () => {
  // useEffect(() => {
  //   // const response = getRedirectResult(auth);
  //   getRedirectResult(auth)
  //     .then(({ user }) => createUserDocumentFromAuth(user))
  //     .then((userDocRef) => console.log(userDocRef));
  // }, []);

  return (
    <AuthenticationContainer>
      <BeachSvg />
      <SignInForm />
    </AuthenticationContainer>
  );
};

export default SignIn;

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const Authentication = () => {
  // useEffect(() => {
  //   // const response = getRedirectResult(auth);
  //   getRedirectResult(auth)
  //     .then(({ user }) => createUserDocumentFromAuth(user))
  //     .then((userDocRef) => console.log(userDocRef));
  // }, []);

  return (
    <div className='authentication-container'>
      {/* <h1>Sign in page</h1> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

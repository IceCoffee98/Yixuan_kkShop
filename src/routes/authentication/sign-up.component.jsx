import { ReactComponent as LetterSvg } from '../../assets/letter.svg';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.styles';

const SignUp = () => {
  return (
    <AuthenticationContainer>
      <SignUpForm />
      <LetterSvg />
    </AuthenticationContainer>
  );
};

export default SignUp;

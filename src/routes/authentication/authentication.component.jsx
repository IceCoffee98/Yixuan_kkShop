import { Routes, Route } from 'react-router-dom';
import SignIn from './sign-in.component';
import SignUp from './sign-up.component';

const Authentication = () => {
  return (
    <Routes>
      <Route index element={<SignIn />}></Route>
      <Route path='sign-up' element={<SignUp />}></Route>
    </Routes>
  );
};

export default Authentication;

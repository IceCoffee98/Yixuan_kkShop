import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;

  h2 {
    margin: 10px 0;
  }

  span {
    font-size: 20px;
  }

  div {
    margin-bottom: 20px;
  }
`;

export const SignUpLink = styled(Link)`
  font-style: italic;
  text-decoration: underline;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

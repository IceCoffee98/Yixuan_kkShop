import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 85px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  border-bottom: 1px solid #ccc;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  height: 100%;
  h1 {
    padding: 0;
    margin: 15px 0 0 0;
    font-size: 45px;
  }
  /* width: 170px; */
`;

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const UserNameLabel = styled.label`
  font-size: 25px;
  font-weight: 700;
`;

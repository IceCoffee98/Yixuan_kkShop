import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 85px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #ccc;

  @media screen and (max-width: 800px) {
    width: 100%;
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  width: 350px;
  height: 100%;
  justify-content: space-around;
  h1 {
    padding: 0;
    margin: 15px 0 0 0;
    font-size: 45px;
  }

  @media screen and (max-width: 800px) {
    width: 350px;
    padding: 0;
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

export const MainContentContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

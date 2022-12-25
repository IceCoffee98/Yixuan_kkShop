import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
`;

export const Img = styled.img`
  border-radius: 6px;
  box-shadow: -1px 1px 2px 2px rgb(0 0 0 / 32%);
  width: 30%;
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`;

export const Name = styled.span`
  font-size: 16px;
`;

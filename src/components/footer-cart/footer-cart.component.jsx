import { Link } from 'react-router-dom';
import { FooterCardContainer, FooterCardTitle } from './footer-cart.styles';

const FooterCard = ({ info }) => {
  const { id, title, contents } = info;
  return (
    <FooterCardContainer>
      <FooterCardTitle>{title}</FooterCardTitle>
      {contents.map((content, idx) => (
        <p key={idx}>{content}</p>
      ))}
    </FooterCardContainer>
  );
};

export default FooterCard;

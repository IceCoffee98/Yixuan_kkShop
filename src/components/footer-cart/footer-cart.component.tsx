import { FC } from 'react';

import { FooterCardContainer, FooterCardTitle } from './footer-cart.styles';

export type FooterCardProps = {
  info: {
    title: string;
    contents: string[];
  };
};

const FooterCard: FC<FooterCardProps> = ({ info }) => {
  const { title, contents } = info;
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

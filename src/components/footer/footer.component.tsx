import FooterCard from '../footer-cart/footer-cart.component';
import { InfosContainer, FooterContainer } from './footer.styles';
import SocianIcons from '../social-icons/social-icons.component';
const Infos = [
  {
    title: 'About Me',
    contents: [
      "I'm Yixuan Yu, a Computer Science student at USC seeking for a front-end job. This is the E-Commerce website I have made using React, Redux, Redux-thunk, Redux-saga and I intergrated the payment method using Stripe",
    ],
  },
  {
    title: 'Contact',
    contents: [
      'Address: 1178 W 24TH ST, Los Angeles, CA 90007',
      'Phone: (213)400-2279',
      'Email: easianyu@gmail.com',
    ],
  },
];

const Footer = () => {
  return (
    <FooterContainer>
      <InfosContainer>
        {Infos.map((info) => (
          <FooterCard key={info.title} info={info} />
        ))}
      </InfosContainer>
      <SocianIcons />
    </FooterContainer>
  );
};

export default Footer;

import React from "react";
import {
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  FooterLogo,
  SocialIcon,
  FooterRights,
  FooterSocialIcon,
  FooterWrapper,
  FooterAddress,
  FooterColumn,
  FooterGrid,
} from "./FooterStyles";
import { footerData, footerSocialData } from "../../data/FooterData";
import { Row, Section } from "../../globalStyles";
import { useLocation, useHistory } from 'react-router-dom';

function Footer() {
  
  let history = useHistory();
	let location = useLocation();
  
  const closeMobileMenu = (to, id) => {

    history.push(to);
  };
  return (
    <Section padding="4rem 0 2rem 0">
      <FooterWrapper>
        <FooterGrid justify="space-between">
          <FooterColumn id="footerLogo">
            <FooterLogo to="/">
              <SocialIcon src="./assets/logo.png" />
              VILLA
            </FooterLogo>
            <FooterAddress>Villa Rivero, Cochabamba, Bolivia</FooterAddress>
            <Row align="center" margin="auto  0 0 0" gap="1rem">
              {footerSocialData.map((social, index) => (
                <FooterSocialIcon
                  key={index}
                  href="/"
                  target="_blank"
                  aria-label={social.name}
                >
                  {social.icon}
                </FooterSocialIcon>
              ))}
            </Row>
          </FooterColumn>
          {footerData.map((footerItem, index) => (
            <FooterLinkItems key={index}>
              <FooterLinkTitle>{footerItem.title}</FooterLinkTitle>
              {footerItem.links.map((link, linkIndex) => (
                <FooterLink
                  key={linkIndex}
                  onClick={() => closeMobileMenu(link, linkIndex)}
                >
                  {link}
                </FooterLink>
              ))}
            </FooterLinkItems>
          ))}
        </FooterGrid>
        <FooterRights>VILLA © 2021</FooterRights>
      </FooterWrapper>
    </Section>
  );
}

export default Footer;

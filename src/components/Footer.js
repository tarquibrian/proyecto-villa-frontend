import React from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { IoMdArrowRoundForward } from "react-icons/io";
import {
  AiFillAccountBook,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Section = styled.section`
  background: #000d1a;
  color: #fff;
  width: 100%;
  min-height: 600px;
  padding: 3rem calc((100vw - 1300px) / 2);
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Quote = styled.div`
  flex: 1;
  padding: 2rem 0rem;

  h3 {
    font-size: clamp(2rem, 8vw, 2rem);
    font-style: italic;
  }

  h4 {
    font-size: clamp(1rem, 4vw, 0.2rem);
  }
`;

const FooterInfo = styled.div`
  padding: 2rem;
  line-height: 3;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1rem;
  }
  a {
    color: #fff;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 0rem;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  padding: 2rem 0rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  width: 50%;

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    width: 100%;
  }
`;

const Icons = css`
  font-size: clamp(1rem, 6vw, 2rem);
  margin-right: 1.5rem;
  color: #d8e0fd;
`;

const Instagram = styled(FaInstagram)`
  ${Icons}
`;

const Facebook = styled(FaFacebookF)`
  ${Icons}
`;

const LinkedIn = styled(FaLinkedinIn)`
  ${Icons}
`;

const Youtube = styled(FaYoutube)`
  ${Icons}
`;

const Contact = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <FooterTop>
          <Quote>
            <h3>
              VILLA RIVERO
              <br /> Tierra de Personajes Célebres y Buenas Tradiciones
            </h3>
            <h4>Villa Rivero, Cochabamba, Bolivia</h4>
          </Quote>
          {/* <FooterInfo>
            <h4>DATOS</h4>
            <Link to="/homes">Correo</Link>
            <Link to="/homes">Support</Link>
            <Link to="/homes">Questions</Link>
          </FooterInfo> */}
          <FooterInfo>
            <h4>Datos Institucionales</h4>
            <h4>
              <AiOutlinePhone /> 4768724 - 76146498
            </h4>
            <h4>
              <AiOutlineMail /> villariveromunicipio@gmail.com
            </h4>
            {/* <Link to="/homes">4598726</Link>
            <Link to="/homes">Canada</Link> */}
          </FooterInfo>
        </FooterTop>
        <FooterBottom>
          <SocialIcons>
            <a
              href="//youtube.com/channel/UC1LgOQHsdFxfN36GCSHr36g/featured"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Youtube />
            </a>
            <a
              href="//www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Instagram />
            </a>
            <a
              href="//facebook.com/profile.php?id=100072025826322"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook />
            </a>
            <a
              href="//www.linkedin.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedIn />
            </a>
          </SocialIcons>
          <Contact>
            <Button to="/Login" round="5px">
              LOGIN
              <IoMdArrowRoundForward />
            </Button>
          </Contact>
        </FooterBottom>
      </Container>
      <p style={{ textAlign: "center" }}>
        © 2022 Gobierno Autónomo Municipal de Villa Rivero
      </p>
    </Section>
  );
};

export default Footer;

import React, { Suspense, lazy } from "react";
import Pricing from "../components/Pricing/Pricing";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { HistoriaHome } from "../components/Historia/HistoriaHome";
import styled from "styled-components";
import { Section } from "../globalStyles";
import { Loading } from "../components/Loading/Loading";

// const HistoriaHome = lazy(() => import("../components/Historia/HistoriaHome"));
// const Section = lazy(() => import("../globalStyles"));
// const Footer = React.lazy(() => import("../components/Footer"));

const Header = styled.header`
  background-color: #a0d6cc;
  color: #fff;
  text-align: center;
  padding: 30px 0 120px;
  margin-bottom: 5px;
  min-width: 10rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 45px;
    font-weight: 400;
    letter-spacing: 3px;
    line-height: 0.8;
    padding-top: 50px;
    font-family: "Montserrat", sans-serif;
  }
  h1 span {
    text-transform: uppercase;
    letter-spacing: 7px;
    font-size: 25px;
    line-height: 1;
  }

  p {
    padding-top: 30px;
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 20px;
    }
    h1 span {
      font-size: 18px;
    }
  }
`;

export const Historias = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Pricing /> */}
      {/* <Suspense fallback={<Loading />}> */}
        <Section
          padding="50px 0"
          position="relative"
          inverse
          id="eventos"
          background="true"
        >
          <Header>
            <h1>
              HISTORIAS - BIOGRAFIAS - CUENTOS
              <br /> <span>[ CONOCE MÁS ACERCA DEL MUNICIPIO ]</span>
            </h1>
          </Header>
          <HistoriaHome />
        </Section>
        <Footer />
      {/* </Suspense> */}
    </>
  );
};

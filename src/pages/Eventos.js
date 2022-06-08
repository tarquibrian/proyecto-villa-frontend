import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import { CalendarScreenHome } from "../components/Calendar/CalendarScreenHome";
import { Row, Heading, Section, TextWrapper, Container } from "../globalStyles";
import { Gallery } from "../components/Gallery";
import { GalleryData } from "../data/DataGallery";

export const Eventos = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Section
        smPadding="50px 10px"
        position="relative"
        inverse="false"
        id="eventos"
        margin="0 0 0 0"
      >
        <Container>
          {/* <Row>
            <Heading inverse>EVENTOS</Heading>
          </Row> */}
          <Gallery data={GalleryData} />
        </Container>
      </Section>
      <Section
        smPadding="50px 10px"
        position="relative"
        inverse
        id="eventos"
        margin="0 0 0 0"
        style={{background: 'rgb(215,235,235)',}}
      >
        <Container>
          <Row>
            <Heading inverse>CALENDARIO DE EVENTOS</Heading>
          </Row>
          <CalendarScreenHome />
        </Container>
      </Section>
      {/* <Carousel /> */}
      <Footer />
    </>
  );
};

import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";
import { CalendarScreenHome } from "../components/Calendar/CalendarScreenHome";
import { Row, Heading, Section, TextWrapper, Container } from "../globalStyles";

export const Eventos = () => {
  return (
    <>
      <Navbar />
      <Section
        smPadding="50px 10px"
        position="relative"
        inverse
        id="eventos"
        margin="50px 0 0 0"
      >
        <Container>
          <Row justify="space-between" margin="1rem" wrap="wrap">
            <Heading width="auto" inverse>
              CALENDARIO DE EVENTOS
            </Heading>
          </Row>
          <CalendarScreenHome />
        </Container>
      </Section>

      {/* <Carousel /> */}
      <Footer />
    </>
  );
};

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel/Carousel";
import { CalendarScreenHome } from "../components/Calendar/CalendarScreenHome";
import { Row, Heading, Section, TextWrapper, Container } from "../globalStyles";
import { Gallery } from "../components/Gallery";
import { GalleryData } from "../data/DataGallery";
import axios from "axios";

export const Eventos = () => {
  const [data, setData] = useState();

  // useEffect(() => {
  //   getEventos();
  // }, []);

  // const getEventos = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
  //   setData(res.data.eventos);
  // };

  return (
    <>
      {/* <Navbar /> */}
      <Section
        padding="50px 0"
        position="relative"
        inverse
        id="eventos"
        background="true"
      >
        <Gallery />
        {/* <Container>
          <Row>
            <Heading inverse>EVENTOS</Heading>
          </Row>
        </Container> */}
      </Section>
      <Section
        position="relative"
        inverse
        id="eventos"
        style={{ background: "rgb(215,235,235)" }}
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

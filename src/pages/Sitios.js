import React from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Features from "../components/Features/Features";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "../components/Map/Map";
import { Section, Container } from "../globalStyles";
import {
  FeatureTextWrapper,
  FeatureTitle,
} from "../components/Features/FeaturesStyles";

import Mapp from "../components/Map/Mapp"

export const Sitios = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });
  return (
    <>
      <Navbar />
      <Section smPadding="50px 10px" position="relative" inverse id="sitios">
        <Container>
            <FeatureTitle>LUGARES TURÍSTICOS</FeatureTitle>
          {isLoaded ? <Map /> : null}
        </Container>
      </Section>
      <Features />
      <Footer />
    </>
  );
};

import React, {useState, useEffect} from "react";
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
import axios from "axios"
import Mapp from "../components/Map/Mapp";

export const Sitios = () => {
  const [sitios, setSitios] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });

  useEffect(() => {
    //handleOnLoad()
    fetchSitios();
    console.log(sitios)
  }, []);

  const fetchSitios = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/sitios`
    );
    setSitios(res.data);
  };

  return (
    <>
      <Navbar />
      
      <Section
        smPadding="50px 0px"
        position="relative"
        inverse
        id="sitios"
        margin="50px 0"
      >
        <Container inpading='0'>
          {/* <Features /> */}
          <FeatureTitle>LUGARES TURÍSTICOS</FeatureTitle>
          {isLoaded ? <Map directions lugares={sitios}/> : null}
        </Container>
      </Section>
      
      <Footer />
    </>
  );
};

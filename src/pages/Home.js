import React from "react";

import { Content } from "../components/Content/Content";

// import Hero from "../components/Hero/Hero";
// import Features from "../components/Features/Features";
// import Carousel from "../components/Carousel/Carousel";
// import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { heroOne, heroTwo, heroThree } from "../data/HeroData";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
import { SliderData } from "../data/SliderData";

import PersonInfo from "../components/PersonInfo";
import Footer from "../components/Footer";
import { Container, Section } from "../globalStyles";
import { VideoYoutube } from "../components/Video/VideoYoutube";
import Work from "../components/Gallery/Work";
import WrapperOne from "../components/WrapperOne";
import { data } from "../data/WrapperData";
import { HomeGallery } from "../components/Gallery/HomeGallery";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}

      <Hero slides={SliderData} />

      {/* <button onClick={subscribeUser}>Click Here</button> */}

      <Section>
        <HomeGallery />
        {/* <Work /> */}
      </Section>
      <Content {...heroOne} />

      {/* <WrapperOne data={data} /> */}

      <Content {...heroTwo} />
      <Content {...heroThree} />
      {/* <WrapperOne data={data} /> */}

      <VideoYoutube />
      <Section>
        <Container>
          <PersonInfo />
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default Home;

import React from "react";
import Carousel from "../components/Carousel/Carousel";
import { Content } from "../components/Content/Content";
import Features from "../components/Features/Features";
// import Hero from "../components/Hero/Hero";

import { Hero } from "../components/Hero";
import { heroOne, heroTwo, heroThree } from "../data/HeroData";
// import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { SliderData } from "../data/SliderData";
import { Navbar } from '../components/Navbar'

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}

      <Hero slides={SliderData} />
      <Content {...heroOne} />
      <Content {...heroTwo} />
      <Content {...heroThree} />
      {/* <button onClick={subscribeUser}>Click Here</button> */}
      <Footer />
    </>
  );
};

export default Home;

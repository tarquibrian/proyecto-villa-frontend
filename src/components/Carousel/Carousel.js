import React, { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { data, sliderSettings } from "../../data/CarouselData";
import {
  Row,
  Heading,
  Section,
  TextWrapper,
  Container,
} from "../../globalStyles";
import {
  ButtonContainer,
  ReviewSlider,
  ImageWrapper,
  CarouselImage,
  CardButton,
} from "./CarouselStyles";
import { FeatureTextWrapper, FeatureTitle } from "../Features/FeaturesStyles";
import { CalendarScreen } from "../Calendar/CalendarScreen";
import { CalendarScreenHome } from "../Calendar/CalendarScreenHome";
const Carousel = () => {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <Section smPadding="50px 10px" position="relative" inverse id="about">
      <Container>
          <FeatureTitle>CALENDARIO DE EVENTOS</FeatureTitle>
        <CalendarScreenHome />
      </Container>
      {/* <Container>
        <Row justify="space-between" margin="1rem" wrap="wrap">
          <Heading width="auto" inverse>
            EVENTOS PROXIMOS
          </Heading>
          <ButtonContainer>
            <IconContext.Provider value={{ size: "3rem", color: "#1d609c" }}>
              <FaArrowCircleLeft onClick={sliderRef?.slickPrev} />
              <FaArrowCircleRight onClick={sliderRef?.slickNext} />
            </IconContext.Provider>
          </ButtonContainer>
        </Row>

        <ReviewSlider {...sliderSettings} ref={setSliderRef}>
          {data.map((el, index) => (
            <ImageWrapper key={index}>
              <CarouselImage src={el.image} />
              <TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
                {el.title}
              </TextWrapper>
              <TextWrapper size="0.9rem" margin="0.7rem" color="#4f4f4f">
                {el.description}
              </TextWrapper>
              <CardButton>Conocer Mas</CardButton>
            </ImageWrapper>
          ))}
        </ReviewSlider>
      </Container> */}
    </Section>
  );
};

export default Carousel;

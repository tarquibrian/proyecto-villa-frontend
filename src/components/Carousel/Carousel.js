import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { sliderSettings } from "../../data/CarouselData";
import { useLocation } from "react-router";
import axios from "axios";
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
import { Link } from "react-router-dom";
const Carousel = ({ titulo }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const PF = process.env.REACT_APP_IMG_URL + "/images/";

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts` + search
      );
      setPosts(res.data);
      console.log(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <Section
      smPadding="50px 10px"
      position="relative"
      inverse
      id="about"
      margin="0 0 0 0"
    >
      <Container>
        <Row justify="space-between" margin="1rem" wrap="wrap">
          <Heading width="auto" inverse>
            {titulo}
          </Heading>
          <ButtonContainer>
            <IconContext.Provider value={{ size: "3rem", color: "#1d609c" }}>
              <FaArrowCircleLeft onClick={sliderRef?.slickPrev} />
              <FaArrowCircleRight onClick={sliderRef?.slickNext} />
            </IconContext.Provider>
          </ButtonContainer>
        </Row>

        <ReviewSlider {...sliderSettings} ref={setSliderRef}>
          {posts.map((el, index) => (
            <ImageWrapper key={index}>
              <CarouselImage src={PF + el.photo} />
              <TextWrapper size="1.1rem" margin="0.4rem 0 0" weight="bold">
                {el.title}
              </TextWrapper>
              <CardButton>
                <Link to={`/postHome/${el._id}`}>
                  <CardButton>Conocer Mas</CardButton>
                </Link>
              </CardButton>
            </ImageWrapper>
          ))}
        </ReviewSlider>
      </Container>
    </Section>
  );
};

export default Carousel;

import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Container, Section } from "../../globalStyles";
import { SliderData } from "../../data/SliderData";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-template-rows: minmax(300px, auto);
  gap: 0.2rem;
  grid-auto-flow: dense;
  padding: 2rem 0 0 0;
`;

const GridItem = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    transition: 200ms;
  }
  @media (min-width: 600px) {
    grid-column: ${({ span }) => (span ? "span 2" : "")};
  }
`;

const TextItem = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background: rgba(18, 22, 25, 0.9);
  h2 {
    color: white;
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
  &:hover {
    opacity: 1;
  }
`;

export const HomeGallery = () => {
  return (
    <Section>
      <Container>
        <GridContainer>
          {/* <GridItem style={{ gridColumn: "span 2" }}>1</GridItem> */}
          {SliderData.map((item, index) => (
            <GridItem span={item.span}>
              <img src={item.image} alt="" />
              <TextItem>
                <h2>{item.title}</h2>
              </TextItem>
            </GridItem>
          ))}
        </GridContainer>
      </Container>
    </Section>
  );
};

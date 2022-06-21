import React from "react";
import styled from "styled-components";
import "./gallery.css";
import { Container } from "../../globalStyles";
import { SliderData } from "../../data/SliderData";

// import FullscreenIcon from "@mui/icons-material/Fullscreen"
// import IosShareIcon from "@mui/icons-material/IosShare"
// const Container = styled.section`
//   background-color: #08071c;
//   padding: 40px 0;
//   height: 170vh;
//   img {
//     width: 100%;
//     height: 550px;
//     object-fit: cover;
//   }
// `;

const Heading = styled.div`
  text-align: center;
  text-align: center;
  color: #fff;
  padding: 50px 0;
  h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 20vw);
`;

const Box = styled.div`
  &:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  &:nth-child(2) {
    grid-column-start: 5;
    grid-column-end: 7;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  &:nth-child(3) {
    grid-column-start: 7;
    grid-column-end: 9;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  &:nth-child(4) {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 8;
    grid-row-end: 8;
  }
  &:nth-child(5) {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 8;
    grid-row-end: 8;
  }
  &:nth-child(6) {
    grid-column-start: 5;
    grid-column-end: 9;
    grid-row-start: 8;
    grid-row-end: 8;
  }
`;

const Work = () => {
  return (
    <Container inpading='0'>
      <section className="work">
        <div className="heading">
          <h2>LUGARES TURISTICOS</h2>
          <h1>CONOCE LUGARES CARACTERISTICOS</h1>
        </div>

        <div className="content">
          {SliderData.map((val) => {
            return (
              <div className="box">
                <div className="img">
                  <img src={val.image} alt="" />
                </div>
                <div className="overlay">
                  <div className="text">
                    <h2>{val.title}</h2>
                    <p>{val.price}</p>
                  </div>
                  <div className="icon">
                    {/* <FullscreenIcon className='iconWork' />
                    <IosShareIcon className='iconWork' /> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
};

export default Work;

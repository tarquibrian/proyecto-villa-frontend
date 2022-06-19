import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdTennisball } from "react-icons/io";
import { Link } from "react-router-dom";
import { Container } from "../globalStyles";
import axios from "axios";
import { useSelector } from "react-redux";

const Section = styled.section``;

const Portafolio = styled.section`
  width: 100%;
  height: 100%;
  /* min-height: 1500px; */
  background: transparent;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto, 1fr);
  /* grid-template-rows: ; */
  grid-gap: 5px;
  @media (min-width: 300px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Project = styled.div`
  position: relative;
  /* background: #a0d6cc; */
  overflow: hidden;
  height: 30rem;
  width: 100%;
  p {
    position: absolute;
    text-align: center;
    width: 100%;
    padding: 1em 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    z-index: 3;
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`;

const Title = styled.h3`
  position: absolute;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  bottom: 0;
  font-weight: 100;
  font-size: 0.8em;
  z-index: 3;
  text-transform: uppercase;
  color: #474545;
  letter-spacing: 2px;
`;

const Overlay = styled.div`
  background: rgba(18, 22, 25, 0.925);
  height: 100%;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: relative;
  display: grid;
  justify-items: center;
  align-items: center;
  transform: translateY(101%);
  transition: all 0.3s ease-in-out;

  button {
    background: none;
    outline: none;
    font-weight: 100;
    letter-spacing: 2px;
    border: 1px solid #ffffff;
    color: #ffffff;
    text-transform: uppercase;
    padding: 10px;
  }

  button:hover {
    transition: all 0.3s ease-in-out;
    background: #ffffff;
    color: #a0d6cc;
    transform: scale(1.05);
  }

  ${Project}:hover & {
    transform: translateY(0%);
  }
`;

const Header = styled.header`
  background-color: #a0d6cc;
  color: #fff;
  text-align: center;
  padding: 30px 0 120px;
  margin-bottom: 5px;
  min-width: 10rem;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 45px;
    font-weight: 400;
    letter-spacing: 3px;
    line-height: 0.8;
    padding-top: 50px;
    font-family: "Montserrat", sans-serif;
  }
  h1 span {
    text-transform: uppercase;
    letter-spacing: 7px;
    font-size: 25px;
    line-height: 1;
  }

  p {
    padding-top: 30px;
  }
  @media screen and (max-width: 600px) {
    h1 {
      font-size: 20px;
    }
    h1 span {
      font-size: 18px;
    }
  }
`;

const BtnGallery = styled(Link)`
  background: none;
  outline: none;
  font-weight: 100;
  letter-spacing: 2px;
  border: 1px solid #ffffff;
  color: #ffffff;
  text-transform: uppercase;
  padding: 10px;
  text-decoration: none;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: #ffffff;
    color: #a0d6cc;
    transform: scale(1.05);
    text-decoration: none;
  }
`;
const PF = process.env.REACT_APP_IMG_URL + "/images/";

export const Gallery = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  // useEffect(() => {
  //   getEventos();
  // }, []);

  // const getEventos = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
  //   setData(res.data.eventos);
  //   console.log(res.data.eventos);
  // };
  return (
    <div>
      <Header>
        <h1>
          PRÓXIMOS EVENTOS <br /> <span>[ VISÍTANOS PRONTO ]</span>
        </h1>
      </Header>
      <Container>
        <Section>
          <Portafolio>
            {events.map((item, index) => (
              <>
                {item.photo !== undefined && (
                  <Project>
                    <Image className="" src={PF + item.photo} />
                    <p>{item.title}</p>
                    <Title>{item.title}</Title>
                    <Overlay>
                      <BtnGallery to="/">SABER MÁS</BtnGallery>
                    </Overlay>
                  </Project>
                )}
              </>
            ))}
          </Portafolio>
        </Section>
      </Container>
    </div>
  );
};

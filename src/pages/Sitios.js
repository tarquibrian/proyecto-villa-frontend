import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Features from "../components/Features/Features";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "../components/Map/Map";
import { Section, Container } from "../globalStyles";
import axios from "axios";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./styles.css";
import { MapPlace } from "../components/Map/MapPlace";
import styled from "styled-components";

const Header = styled.header`
  background-color: #a0d6cc;
  color: #fff;
  text-align: center;
  padding: 30px 0 120px;
  margin-bottom: 5px;
  min-width:10rem;
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
  @media screen and (max-width: 600px){
    h1 {
      font-size: 20px;
    }
    h1 span {
    font-size: 18px;
  }
  }
`;

export const Sitios = () => {
  const [sitios, setSitios] = useState([]);
  const [place, setPlace] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });

  useEffect(() => {
    //handleOnLoad()
    fetchSitios();
  }, []);

  const fetchSitios = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sitios`);
    setSitios(res.data);
  };

  const mostrarSitio = (id) => {
    setPlace(id);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Section padding="50px 0" inverse id="sitios" margin="0">
        <Header>
          <h1>
            LUGARES TURÍSTICOS <br /> <span>[ VISÍTANOS PRONTO ]</span>
          </h1>
        </Header>
        <Container>
          {isLoaded ? (
            <div>
              <Tabs>
                <TabList>
                  <Tab>MAPA DE SITIOS</Tab>
                  <Tab>LISTA DE SITIOS</Tab>
                </TabList>
                <TabPanel>
                  <Map directions lugares={sitios} />
                </TabPanel>
                <TabPanel>
                  <div className="">
                    <div className="row">
                      <div className="col-md">
                        <table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>OPCIONES</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sitios.map((p, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{p.title}</td>
                                <td>{p.description}</td>
                                <td>
                                  <button
                                    className="btn btn-success"
                                    onClick={() => mostrarSitio(p._id)}
                                  >
                                    MOSTRAR
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md">
                        <MapPlace place={place} />
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          ) : null}
          {/* <Features /> */}
        </Container>
      </Section>

      <Footer />
    </>
  );
};

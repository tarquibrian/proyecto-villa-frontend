import React, { useState, useEffect } from "react";
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
import axios from "axios";
import Mapp from "../components/Map/Mapp";
import { ContentColumn, ContentRow } from "../components/Content/ContentStyles";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./styles.css";
import { data } from "../data/NavbarData";
import { MapPlace } from "../components/Map/MapPlace";
import { notificarme } from "../subscription";
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
    console.log(id);
    setPlace(id);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Section smPadding="50px 0px 0px 0px" inverse id="sitios" margin="0">
        <Container>
          <FeatureTitle>LUGARES TURÍSTICOS</FeatureTitle>

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

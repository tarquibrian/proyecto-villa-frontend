import React, { useState, useEffect } from "react";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CalendarScreen } from "../components/Calendar/CalendarScreen";
import { Map } from "../components/Map/Map";
import { SidebarMap } from "../components/Map/SidebarMap";
import { useLoadScript } from "@react-google-maps/api";
import Form from "../components/Form/Form";
import { FormHistorias } from "../components/FormHistorias/FormHistorias";
import { Historia } from "../components/Historia/Historia";
import axios from "axios";
export const AdminPage = () => {
  const [sitios, setSitios] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });

  useEffect(() => {
    //handleOnLoad()

    fetchSitios();
    console.log(sitios);
  }, []);
  
  const fetchSitios = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sitios`);
    setSitios(res.data);
    // fetchSitios();
  };
  return (
    <div>
      <NavbarAdmin />
      <Tabs>
        <TabList>
          <Tab>GESTION DE HISTORIAS</Tab>
          <Tab>PLANIFICACION DE EVENTOS</Tab>
          <Tab>LUGARES TURISTICOS</Tab>
        </TabList>
        <TabPanel>
          <Historia />
        </TabPanel>
        <TabPanel>
          <CalendarScreen />
        </TabPanel>
        <TabPanel>
          {/* <SidebarMap /> */}
          {isLoaded ? <Map directions lugares={sitios} /> : null}
        </TabPanel>
      </Tabs>
    </div>
  );
};

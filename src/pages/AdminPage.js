import React from "react";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { CalendarScreen } from "../components/Calendar/CalendarScreen";
import { Map } from "../components/Map/Map";
import { SidebarMap } from "../components/Map/SidebarMap";
import { useLoadScript } from "@react-google-maps/api";
import Form from "../components/Form/Form";
import { FormHistorias } from "../components/FormHistorias/FormHistorias";

const credential = "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg";
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credential}`;

export const AdminPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });

  return (
    <div>
      <NavbarAdmin />
      <Tabs>
        <TabList>
          <Tab>HISTORIA</Tab>
          <Tab>EVENTOS</Tab>
          <Tab>LUGARES</Tab>
        </TabList>
        <TabPanel>
          <FormHistorias />
          <Form />
        </TabPanel>
        <TabPanel>
          <CalendarScreen />
        </TabPanel>
        <TabPanel>
          <SidebarMap />
          {isLoaded ? <Map /> : null}
          {/* <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `80vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          /> */}
        </TabPanel>
      </Tabs>
    </div>
  );
};

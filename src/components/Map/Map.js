import React, { useState, useEffect } from "react";
import axios from "axios";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  DirectionsService,
} from "@react-google-maps/api";
import { coords } from "../../data/MapData";
import { useLocation } from "react-router-dom";
import { AddNewSite } from "../ButtonAdd/AddNewSite";
import { MapModal } from "./MapModal";

const initResponse = {
  response: null,
};

export const Map = ({ lugares }) => {
  const [positionValue, setPositionValue] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [destinationValue, setDestinationValue] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [responseValue, setResponseValue] = useState(initResponse);

  const [activeMarker, setActiveMarker] = useState(null);

  const [sitios, setSitios] = useState([]);

  const { search } = useLocation();

  useEffect(() => {
    //handleOnLoad()
    fetchSitios();
    console.log("lugares", lugares);
    console.log(sitios);
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const fetchSitios = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/sitios` + search
    );
    setSitios(res.data);
  };

  const directionsCallback = (response) => {
    console.log("RESPONSE", response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponseValue(response);
      } else {
        console.log("response: ", response);
      }
    }
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    coords.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/sitios/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const capturePosition = (destination) => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      setPositionValue({
        ...positionValue,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setDestinationValue({
        ...destinationValue,
        latitude: destination.lat,
        longitude: destination.lng,
      });
    });
    console.log(positionValue, destinationValue);
  };

  return (
    <>
      <div className="map-settings"></div>
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={(e) => {
            console.log(e.latLng.lat());
            setActiveMarker(null);
          }}
          mapContainerStyle={{ width: "100%", height: "80vh" }}
        >
          {sitios.map(
            ({ _id, title, lat, lng, description, city, country }) => (
              <Marker
                key={_id}
                position={{ lat, lng }}
                onClick={() => handleActiveMarker(_id)}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/4668/4668396.png",
                  anchor: new window.google.maps.Point(17, 46),
                  scaledSize: new window.google.maps.Size(80, 80),
                }}
              >
                {activeMarker === _id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Plaza_de_Villa_Rivero.JPG"
                        alt="plaza villa rivero"
                        width="150"
                        height="150"
                      />
                      <h5>{title}</h5>
                      <h5>{description}</h5>
                      <h5>{city}</h5>
                      <h5>{country}</h5>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => capturePosition({ lat, lng })}
                      >
                        GENERAR RUTA
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(_id)}
                      >
                        ELIMINAR SITIO
                      </button>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            )
          )}
          {positionValue !== "" && destinationValue !== "" && (
            <DirectionsService
              options={{
                destination: {
                  lat: destinationValue.latitude,
                  lng: destinationValue.longitude,
                },
                origin: {
                  lat: positionValue.latitude,
                  lng: positionValue.longitude,
                },
                travelMode: "DRIVING",
              }}
              callback={directionsCallback}
            />
          )}

          {responseValue !== null && (
            <DirectionsRenderer
              options={{
                directions: responseValue,
              }}
            />
          )}
          {/* <DirectionsRenderer directions={direct} /> */}
          <AddNewSite />
          <MapModal />
        </GoogleMap>
      </div>
    </>
  );
};

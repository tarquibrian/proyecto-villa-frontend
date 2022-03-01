import React, { useState } from "react";
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

const initResponse = {
  response: null,
};

export const Map = (props) => {
  const [positionValue, setPositionValue] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [destinationValue, setDestinationValue] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [responseValue, setResponseValue] = useState(initResponse);

  // const direct = directionsService.route(
  //   {
  //     origin: new window.google.maps.LatLng(
  //       -17.610974607740435,
  //       -65.79336404800415
  //     ),
  //     destination: new window.google.maps.LatLng(
  //       -17.609747482988404,
  //       -65.82282543182373
  //     ),
  //     travelMode: "DRIVING",
  //   },
  //   (response, status) => {
  //     console.log(response);
  //     console.log(status);
  //   }
  // );
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
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
      <div className="map-settings">
        
      </div>
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "100%", height: "80vh" }}
        >
          {coords.map(({ id, name, position, description }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/4668/4668396.png",
                anchor: new window.google.maps.Point(17, 46),
                scaledSize: new window.google.maps.Size(80, 80),
              }}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Plaza_de_Villa_Rivero.JPG"
                      alt="plaza villa rivero"
                      width="150"
                      height="150"
                    />
                    <h5>{description.title}</h5>
                    <h5>{description.city}</h5>
                    <h5>{description.country}</h5>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => capturePosition(position)}
                    >
                      IR A ESTE LUGAR
                    </button>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
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
            <DirectionsRenderer options={{
              directions: responseValue,
            }}/>
          )}
          {/* <DirectionsRenderer directions={direct} /> */}
        </GoogleMap>
      </div>
    </>
  );
};

import React, { useState } from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { coords } from "../../data/MapData";

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 },
  },
];

export const Map = () => {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    coords.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "80vh" }}
    >
      {coords.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/4668/4668396.png',
            anchor: new window.google.maps.Point(17, 46),
            scaledSize: new window.google.maps.Size(80, 80),
          }}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
};

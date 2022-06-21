import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import "./style.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const initSite = {
  title: "",
  description: "",
  city: "Villa Rivero",
  country: "Bolivia",
  lat: "",
  lng: "",
};

Modal.setAppElement("#root");
const initResponse = {
  response: null,
};

const PF = process.env.REACT_APP_IMG_URL + "/images/";

export const Map = ({lugares}) => {
  const { uid } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null)
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
    console.log(res.data)
  };

  const directionsCallback = (response) => {
    console.log("RESPONSE", response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponseValue(response);
      } else {
        // console.log("response: ", response);
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
      fetchSitios();
    } catch (err) {
      // console.log(err);
    }
  };

  const captureClick = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/sitios/contador`, {
        id: id,
      });
      //fetchSitios();
    } catch (err) {
      // console.log(err);
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
    // console.log(positionValue, destinationValue);
  };

  const { modalOpen } = useSelector((state) => state.ui);
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initSite);
  const { title, description, city, country, lat, lng } = formValues;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initSite);
    fetchSitios();
  };
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      formValues.photo = filename;
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/upload`, data);
      } catch (err) {}
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    setTitleValid(true);
    console.log(formValues);
    await axios.post(`${process.env.REACT_APP_API_URL}/sitios`, formValues);
    closeModal();
    fetchSitios();
  };

  return (
    <>
      <div className="map-settings"></div>
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={{ width: "100%", height: "80vh" }}
        >
          {sitios.map(
            ({ _id, title, lat, lng, description, city, country, photo }) => (
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
                        src={PF + photo}
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
                        onClick={() => {
                          capturePosition({ lat, lng });
                          captureClick(_id);
                        }}
                      >
                        GENERAR RUTA
                      </button>
                      {uid !== undefined && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(_id)}
                        >
                          ELIMINAR SITIO
                        </button>
                      )}
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
          {uid !== undefined && <AddNewSite />}

          {/* <MapModal /> */}
          <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            contentLabel="Example Modal"
          >
            <h2> Detalles de Sitio </h2>
            <form className="container" onSubmit={handleSubmitForm}>
              <hr />
              <div className="form-group">
                <input
                  type="file"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Descripcion"
                  rows="5"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  placeholder="city"
                  name="city"
                  autoComplete="off"
                  value={city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  placeholder="country"
                  name="country"
                  autoComplete="off"
                  value={country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  placeholder="lat"
                  name="lat"
                  autoComplete="off"
                  value={lat}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${!titleValid && "is-invalid"}`}
                  placeholder="lng"
                  name="lng"
                  autoComplete="off"
                  value={lng}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-primary btn-block"
              >
                <i className="far fa-save"></i>
                <span>Guardar</span>
              </button>
            </form>
            {/* <button onClick={closeModal}>close</button> */}
          </Modal>
        </GoogleMap>
      </div>
    </>
  );
};

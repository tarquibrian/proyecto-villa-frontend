import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import "./style.css";
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

export const MapModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initSite);
  const { title, description, city, country, lat, lng } = formValues;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initSite);
  };
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    setTitleValid(true);
    console.log(formValues)
    await axios.post(`${process.env.REACT_APP_API_URL}/sitios`, formValues)
    closeModal();
  };
  return (
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

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span>Guardar</span>
        </button>
      </form>
      {/* <button onClick={closeModal}>close</button> */}
    </Modal>
  );
};

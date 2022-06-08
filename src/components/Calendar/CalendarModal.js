import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import { coords } from "../../data/MapData";
import Swal from "sweetalert2";
import "./style.css";
import { uiCloseModal } from "../../actions/ui";
import {
  eventAddNew,
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
  eventUpdated,
} from "../../actions/events";
import { useLoadScript } from "@react-google-maps/api";
import { Map } from "../Map/Map";
import { MapPlace } from "../Map/MapPlace";
import axios from "axios";

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
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowone = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowone.toDate(),
  place: "",
};

export const CalendarModal = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAKMws4QJbXE3xtlmJRBpJwfk1BUCUMEhg", // Add your API key
  });
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sitios, setSitios] = useState([]);
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowone.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end, place } = formValues;

  useEffect(() => {
    getEvents();
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  //console.log(formValues);
  };
  const getEvents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sitios`);
    setSitios(res.data);
    console.log("sitios", sitios);
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }
    setTitleValid(true);
    closeModal();
    enviarNotificacion();
  };

  const enviarNotificacion = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/notification/push`, {
      titulo: "EVENTO PROXIMO: " + formValues.title,
      cuerpo: formValues.notes,
      usuario: "tarqui",
    });
    //console.log("form", formValues);
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Detalles de Evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
            disabled={uid ? false : true}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
            disabled={uid ? false : true}
          />
        </div>

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
            disabled={uid ? false : true}
          />
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Descripcion"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
            disabled={uid ? false : true}
          ></textarea>
        </div>

        {/* <div className="form-group">
          <select
            name="place"
            class="form-select"
            value={place}
            onChange={handleInputChange}
            disabled={uid ? false : true}
          >
            {coords.map((item) => (
              <option selected key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div> */}

        <div className="form-group">
          <select
            name="place"
            class="form-select"
            value={place}
            onChange={handleInputChange}
            disabled={uid ? false : true}
          >
            <option selected>Seleccionar sitio</option>
            {sitios.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {uid !== undefined && (
          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        )}

        {uid === undefined && (
          <div>{isLoaded ? <MapPlace place={place} /> : null}</div>
        )}
      </form>
    </Modal>
  );
};

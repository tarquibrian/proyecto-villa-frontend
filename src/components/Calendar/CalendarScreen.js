import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ContainerCalendar } from "./CalendarScreenStyles";
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { messages } from "../../data/CalendarData";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { uiOpenModal } from "../../actions/ui";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import {
  eventSetActive,
  eventClearActiveEvent,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ButtonAdd/AddNewFab";
import { DeleteEventFab } from "../ButtonAdd/DeleteEventFab";
import { ReporteEventos } from "../Reports/ReporteEventos";
import DateTimePicker from "react-datetime-picker";

moment.locale("es");

const nows = moment().minutes(0).seconds(0).add(1, "hours");
const nowone = nows.clone().add(1, "hours");

pdfmake.vfs = pdfFonts.pdfMake.vfs;
const initReport = {
  start: nows.toDate(),
  end: nowone.toDate(),
};
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [newdata, setNewData] = useState([]);

  const [dateStart, setDateStart] = useState(nows.toDate());
  const [dateEnd, setDateEnd] = useState(nowone.toDate());

  const [formValues, setFormValues] = useState(initReport);

  const { start, end } = formValues;
  const dispatch = useDispatch();
  const [sitios, setSitios] = useState([]);
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  console.log(uid);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
    getEvents();
  }, [dispatch]);

  const getEvents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
    setSitios(res.data);
  };
  const onDoubleClick = (e) => {
    // console.log(e);
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };
  const docDefinition = {
    content: [
      "This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns",
    ],
  };
  var dd = {
    content: [
      { text: "Tables", style: "header" },
      "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
      {
        text: "A simple table (no headers, no width specified, no spans, no styling)",
        style: "subheader",
      },
      "The following table has nothing more than a body array",
      {
        style: "tableExample",
        table: {
          body: [
            ["Evento", "Inicio", "Fin"],
            ["sitios.evento[0].title", "Another one here", "OK?"],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };
  const generarPDF = () => {
    if (isTrue === true) setIsTrue(false);
    if (isTrue === false) setIsTrue(true);
    getEvents();
    // console.log(sitios.eventos)
    // const pdf = pdfmake.createPdf(dd);

    // pdf.open();
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
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const momentStart = moment(start).format();
    const momentEnd = moment(end).format();
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/events`, {
      start: momentStart,
      end: momentEnd,
    });
    setNewData(res.data);
    console.log(newdata);
    // console.log(momentStart,momentEnd)
    // // console.log(momentStart, momentEnd);
    // // eventos.forEach(function (item, index) {
    // //   let date = moment(item.start).format("YYYY-MM-DD");
    // //   if (moment(date).isAfter(momentStart, momentEnd)) {
    // //     console.log("datarow", item.start, index);
    // //     reporte.push(item);
    // //   }
    // // });
    // // console.log("reportesss", reporte);
    // // console.log("eventossss", eventos)
    // // eventos.map(
    // //   function (m) {
    // //     let date = moment(m.start).format("YYYY-MM-DD");
    // //     if (moment(date).isAfter(momentStart, momentEnd)) {
    // //       console.log("resultado", m);
    // //       setNewData(newdata.push(m.start))
    // //     }
    // //     return console.log(m.start);
    // //   }
    // //   // console.log(m)
    // // );
    // // console.log("data",newdata)
    // const pdf = pdfmake.createPdf(ddd);
    // pdf.open();
  };
  const [isTrue, setIsTrue] = useState(false);
  return (
    <div>
      <button onClick={generarPDF}>GENERAR PDF</button>
      {isTrue ? (
        <div>
          <Tabs>
            <TabList>
              <Tab>REPORTES POR FECHAS</Tab>
              {/* <Tab>REPORTES POR EVENTOS</Tab> */}
              <Tab>REPORTES POR SITIOS</Tab>
            </TabList>
            <TabPanel>
              {/* <h1>FECHAS</h1> */}
              <div className="container mb-3">
                <form className="" onSubmit={handleSubmitForm}>
                  <div className="form-group">
                    <label>Fecha inicio</label>
                    <DateTimePicker
                      onChange={handleStartDateChange}
                      value={dateStart}
                      className={"form-control"}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha final</label>
                    <DateTimePicker
                      onChange={handleEndDateChange}
                      value={dateEnd}
                      className={"form-control"}
                    />
                  </div>
                  <button className="btn btn-secondary" type="submit">Buscar</button>
                </form>
                {newdata && newdata.length ? (
                  <h1>se encontraron {newdata.length} resultados</h1>
                ) : null}
                <ReporteEventos className="form-group" eventos={newdata} />
              </div>
            </TabPanel>
            {/* <TabPanel>EVENTOS</TabPanel> */}
            <TabPanel>{/* <h1>SITIOS</h1> */}</TabPanel>
          </Tabs>
        </div>
      ) : null}
      <div>
        <ContainerCalendar className="calendar-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />

        <AddNewFab />

        {activeEvent && <DeleteEventFab />}

        <CalendarModal />
      </ContainerCalendar>
      </div>
      
    </div>
  );
};

import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

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
import { timeout } from "workbox-core/_private";

moment.locale("es");

const nows = moment().minutes(0).seconds(0).add(1, "hours");
const nowone = nows.clone().add(1, "hours");

pdfmake.vfs = pdfFonts.pdfMake.vfs;
const initReport = {
  start: nows.toDate(),
  end: nowone.toDate(),
};
const localizer = momentLocalizer(moment);
ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);
export const CalendarScreen = () => {
  const [newdata, setNewData] = useState([]);
  const [newdatasitios, setNewDataSitios] = useState({});
  const [chartData, setChartData] = useState({});
  const [dateStart, setDateStart] = useState(nows.toDate());
  const [dateEnd, setDateEnd] = useState(nowone.toDate());

  const [formValues, setFormValues] = useState(initReport);

  const { start, end } = formValues;
  const dispatch = useDispatch();
  const [sitios, setSitios] = useState([]);
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
    getEvents();
    getSitios();
  }, [dispatch]);

  const getEvents = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
    setSitios(res.data);
  };

  const getSitios = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/sitios`);
    let total = 0;
    res.data.forEach((element) => {
      if (!isNaN(element.counter)) {
        total = total + element.counter;
      }
    });
    setChartData({
      labels: res.data.map((item) => item.title),
      datasets: [
        {
          label: "TOTAL VISITAS: " + total,
          data: res.data.map((item) => item.counter),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  const onDoubleClick = (e) => {
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
  };
  const [isTrue, setIsTrue] = useState(false);
  const data1 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ESTADISTICAS TIPO TORTA",
      },
    },
  };
  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "ESTADISTICAS TIPO BARRA",
      },
    },
  };

  return (
    <div>
      <button className="btn btn-warning m-3" onClick={generarPDF}>
        MOSTRAR REPORTES
      </button>
      <div></div>
      {isTrue ? (
        <div>
          <Tabs>
            <TabList>
              <Tab>REPORTES POR FECHAS</Tab>
              <Tab>ESTADISTICAS DE LAS VISITAS</Tab>
              {/* <Tab>REPORTES POR EVENTOS</Tab> */}
              {/* <Tab>REPORTES POR SITIOS</Tab> */}
            </TabList>
            <TabPanel>
              {/* <h1>FECHAS</h1> */}
              <div className="container mb-3 background p-2">
                <form className="" onSubmit={handleSubmitForm}>
                  <div className="row">
                    <div className="form-group col">
                      <label>Fecha inicio</label>
                      <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className={"form-control index"}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Fecha final</label>
                      <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className={"form-control indexx"}
                      />
                    </div>
                  </div>

                  <button className="btn btn-secondary mb-3" type="submit">
                    Buscar
                  </button>
                </form>
                {newdata && newdata.length ? (
                  <h1>se encontraron {newdata.length} resultados</h1>
                ) : null}
                <ReporteEventos className="form-group" eventos={newdata} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container">
                <div className="row align-items-start">
                  <div className="col">
                    <Pie
                      options={{
                        responsive: true,
                        plugins: {
                          title: {
                            display: true,
                            text: "GRAFICO DE TORTA",
                          },
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        },
                      }}
                      data={chartData}
                    />
                  </div>
                  <div className="col">
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          title: {
                            display: true,
                            text: "GRAFICO DE BARRAS",
                          },
                          legend: {
                            display: true,
                            position: "bottom",
                          },
                        },
                      }}
                      data={chartData}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            {/* <TabPanel></TabPanel> */}
          </Tabs>
        </div>
      ) : null}
      <div>
        <ContainerCalendar className="calendar-screen index">
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

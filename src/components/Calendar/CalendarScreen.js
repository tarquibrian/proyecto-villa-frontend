import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ContainerCalendar } from "./CalendarScreenStyles";
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { messages } from "../../data/CalendarData";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

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

moment.locale("es");
pdfmake.vfs = pdfFonts.pdfMake.vfs;

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  console.log(uid);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

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
            ["Column 1", "Column 2", "Column 3"],
            ["One value goes here", "Another one here", "OK?"],
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
    const pdf = pdfmake.createPdf(dd);
    pdf.open();
  };

  return (
    <ContainerCalendar className="calendar-screen">
      <button onClick={generarPDF}>GENERAR PDF</button>
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
  );
};

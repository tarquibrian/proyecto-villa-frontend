import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ContainerCalendar } from "./CalendarScreenStyles";

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
  eventStartLoadingHome,
} from "../../actions/events";
import { AddNewFab } from "../ButtonAdd/AddNewFab";
import { DeleteEventFab } from "../ButtonAdd/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreenHome = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  console.log(uid)
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoadingHome());
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
      backgroundColor: (uid === undefined ) ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
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

      {/* {activeEvent && <DeleteEventFab />} */}

      <CalendarModal />
    </ContainerCalendar>
  );
};

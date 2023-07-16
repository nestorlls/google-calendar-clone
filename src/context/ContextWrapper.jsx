import React, { useEffect, useReducer, useState } from 'react';
import GlobalContext from './GlogalContext';
import dayjs from 'dayjs';

const savedEventReduces = (state, { type, payload }) => {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((event) => (event.id === payload.id ? payload : event));
    case 'delete':
      return state.filter((event) => event.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const savedEvents = localStorage.getItem('events');
  if (savedEvents) {
    return JSON.parse(savedEvents);
  }
  return [];
};

const ContextWrapper = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventReduces,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;

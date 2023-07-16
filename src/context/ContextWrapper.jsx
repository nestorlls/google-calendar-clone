import React, { useEffect, useMemo, useReducer, useState } from 'react';
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
  const [labels, setLabels] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventReduces,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((event) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(event.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    setLabels((prev) =>
      [...new Set(savedEvents.map((event) => event.label))].map((label) => {
        const currentLabel = prev.find((lbl) => lbl.label === label);
        return { label, checked: currentLabel ? currentLabel.checked : true };
      })
    );
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = (label) => {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  };

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
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        darkMode,
        setDarkMode,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;

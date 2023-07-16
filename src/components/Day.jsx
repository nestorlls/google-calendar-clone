import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlogalContext';
import EventModal from './EventModal';

const getCurrentDayClass = (day) => {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
    ? 'bg-blue-600 text-white rounded-full w-7 h-7'
    : '';
};

const Day = ({ day, rowIndex }) => {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const currentClass = getCurrentDayClass(day);

  return (
    <div className="border border-gray-300 flex flex-col dark:border-gray-600">
      <header className="flex flex-col items-center text-gray-800 dark:text-gray-100">
        {rowIndex % 7 === 0 && (
          <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${currentClass}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}>
        {dayEvents.map((event, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(event)}
            className={`${event.label} p-2 mr-3 text-gray-100 dark:text-gray-950 text-sm rounded mb-1 truncate`}>
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;

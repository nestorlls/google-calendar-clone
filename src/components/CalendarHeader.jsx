import logo from '../assets/calendar-logo.png';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import GlobalContext from '../context/GlogalContext';
import { useContext } from 'react';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="logo calendar" className="w-10" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <MdKeyboardArrowLeft
          title="Go to previous month"
          size={30}
          className="cursor-pointer text-gray-600 mx-2"
        />
      </button>
      <button onClick={handleNextMonth}>
        <MdKeyboardArrowRight
          title="Go to next month"
          size={30}
          className="cursor-pointer text-gray-600 mx-2"
        />
      </button>
      <h2 className="ml-4 text-xl text-gray-600 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;

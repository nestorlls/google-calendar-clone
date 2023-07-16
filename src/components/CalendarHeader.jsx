import logo from '../assets/calendar-logo.png';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';
import GlobalContext from '../context/GlogalContext';
import { useContext } from 'react';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, setDarkMode, darkMode } =
    useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header className="px-4 py-2 flex justify-between bg-gray-100  dark:bg-slate-800 dark:text-gray-100">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo calendar" className="w-10" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold dark:text-gray-300">
          Calendar
        </h1>
        <button
          className="border rounded py-2 px-4 mr-5 hover:bg-slate-200 dark:border-gray-700 dark:hover:bg-slate-700"
          onClick={handleReset}>
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <MdKeyboardArrowLeft
            title="Go to previous month"
            size={30}
            className="cursor-pointer text-gray-600 mx-2 hover:scale-110 dark:text-gray-400"
          />
        </button>
        <button onClick={handleNextMonth}>
          <MdKeyboardArrowRight
            title="Go to next month"
            size={30}
            className="cursor-pointer text-gray-600 mx-2 hover:scale-110 dark:text-gray-400"
          />
        </button>
        <h2 className="ml-4 text-xl text-gray-600 font-bold dark:text-gray-400">
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
        </h2>
      </div>
      <div className="grid justify-items-center cursor-pointer">
        {darkMode ? (
          <MdOutlineLightMode size={30} onClick={() => setDarkMode(false)} />
        ) : (
          <MdOutlineDarkMode size={30} onClick={() => setDarkMode(true)} />
        )}
      </div>
    </header>
  );
};

export default CalendarHeader;

import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { getMonth } from '../utils';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import GlobalContext from '../context/GlogalContext';

const SmallCalendar = () => {
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);
  const [currentMonthIndex, setcurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setcurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setcurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    setcurrentMonthIndex(currentMonthIndex + 1);
  };

  const getDayClass = (day) => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currentDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currentDay) {
      return 'bg-blue-600 text-white rounded-full dark:text-gray-100';
    } else if (slcDay === currentDay) {
      return 'bg-blue-200 text-gray-800 rounded-full dark:text-gray-800';
    }
    return '';
  };

  return (
    <div className="mt-9 ">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold dark:text-gray-200">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            'MMMM YYYY'
          )}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <MdKeyboardArrowLeft
              title="Go to previous month"
              size={30}
              className="cursor-pointer text-gray-600 mx-2 dark:text-gray-200"
            />
          </button>
          <button onClick={handleNextMonth}>
            <MdKeyboardArrowRight
              title="Go to next month"
              size={30}
              className="cursor-pointer text-gray-600 mx-2 dark:text-gray-200"
            />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, index) => (
          <span
            key={index}
            className="text-sm py-1 text-center text-gray-800 dark:text-gray-100">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((day, index) => (
              <button
                key={index}
                className={`py-1 w-full dark:text-gray-100 ${getDayClass(day)}`}
                onClick={() => setSmallCalendarMonth(currentMonthIndex)}
                onClickCapture={() => setDaySelected(day)}>
                <span className="text-sm ">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;

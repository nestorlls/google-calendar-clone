import React, { useContext, useEffect, useState } from 'react';

import { getMonth } from './utils';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlogalContext';
import EventModal from './components/EventModal';

const App = () => {
  const [currentMonth, setcurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, darkMode } = useContext(GlobalContext);

  useEffect(() => {
    setcurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className={`h-screen flex flex-col ${darkMode && 'dark'}`}>
        {showEventModal && <EventModal />}
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default App;

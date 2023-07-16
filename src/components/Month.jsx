import React from 'react';
import Day from './Day';

const Month = ({ month }) => {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-gray-100 dark:bg-gray-700">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day key={idx} day={day} rowIndex={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;

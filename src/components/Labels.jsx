import React, { useContext } from 'react';
import GlobalContext from '../context/GlogalContext';

const labelsClasses = {
  indigo: 'text-indigo-500',
  gray: 'text-gray-500',
  green: 'text-green-500',
  blue: 'text-blue-500',
  red: 'text-red-500',
  purple: 'text-purple-500',
};

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">
        {labels.map(({ label: lbl, checked }, index) => (
          <label key={index} className="items-center mt-3 block">
            <input
              type="checkbox"
              name=""
              id=""
              checked={checked}
              onChange={() => updateLabel({ label: lbl, checked: !checked })}
              className={`form-checkbox h-5 w-5 ${
                labelsClasses[lbl.split('-')[1]]
              } rounded focus:ring-0 cursor-pointer `}
            />
            <span className="ml-2 text-gray-700 capitalize">
              {lbl.split('-')[1]}
            </span>
          </label>
        ))}
      </p>
    </React.Fragment>
  );
};

export default Labels;

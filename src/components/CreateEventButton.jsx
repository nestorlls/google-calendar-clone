import { useContext } from 'react';
import plusIcon from '../assets/plus.svg';
import GlobalContext from '../context/GlogalContext';
export const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl dark:border-gray-500">
      <img src={plusIcon} alt="plus icon" className="w-7 h-7" />
      <span className="pl-3 pr-7 text-gray-800 dark:text-gray-100">Create</span>
    </button>
  );
};

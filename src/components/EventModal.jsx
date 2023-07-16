import { useContext, useState } from 'react';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';
import { BsBookmark, BsCheck } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { TbMenu } from 'react-icons/tb';
import GlobalContext from '../context/GlogalContext';
import { MdSegment } from 'react-icons/md';

const labelsClasses = [
  'bg-indigo-500',
  'bg-gray-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-red-500',
  'bg-purple-500',
];

const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  console.log(selectedEvent);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [inputValues, setInputValues] = useState({
    title: selectedEvent ? selectedEvent.title : '',
    description: selectedEvent ? selectedEvent.description : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title: inputValues.title,
      description: inputValues.description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: 'push', payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center">
      <form
        className="bg-white rounded-lg shadow-2xl w-1/4"
        onSubmit={handleSubmit}>
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">
            <TbMenu />
          </span>
          <div className="flex gap-2">
            {selectedEvent && (
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => {
                  dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                  setShowEventModal(false);
                }}>
                <FiTrash2 />
              </span>
            )}
            <button
              className="text-gray-400"
              onClick={() => setShowEventModal(false)}>
              <AiOutlineClose />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="add title"
              value={inputValues.title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:ring-blue-400 placeholder:text-gray-300"
              onChange={handleChange}
            />
            <span className="text-gray-400">
              <AiOutlineClockCircle />
            </span>
            <p>{daySelected?.format('dddd, MMMM DD')}</p>
            <span className="text-gray-400">
              <MdSegment />
            </span>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="add description"
              value={inputValues.description}
              required
              className="pt-3 border-0 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:ring-blue-400 placeholder:text-gray-300"
              onChange={handleChange}
            />
            <span className="text-gray-400">
              <BsBookmark />
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((label, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedLabel(label)}
                  className={`${label} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}>
                  {selectedLabel === label && (
                    <span className="text-white text-sm">
                      <BsCheck />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;

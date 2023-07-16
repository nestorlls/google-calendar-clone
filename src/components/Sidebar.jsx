import { CreateEventButton } from './CreateEventButton';
import Labels from './Labels';
import SmallCalendar from './SmallCalendar';

const Sidebar = () => {
  return (
    <aside className="border-t dark:border-gray-600 p-5 w-72 bg-gray-100 dark:bg-gray-800">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;

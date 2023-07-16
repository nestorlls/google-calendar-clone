import { CreateEventButton } from './CreateEventButton';
import Labels from './Labels';
import SmallCalendar from './SmallCalendar';

const Sidebar = () => {
  return (
    <aside className="border p-5 w-72 ">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;

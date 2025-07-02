import { useState } from 'react';
import { CiFlag1 } from "react-icons/ci";
import { TaskPriority } from '../../types/TaskPriority';
import { By } from '../../types/By';

type SortByDDListProps = {
    children:React.ReactNode;
    onSelect:(item:By)=>void;
}

export default function SortByDDList({children,onSelect}:SortByDDListProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item:By) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-gray-300">
      <button
        onClick={() => setOpen(!open)}
      >
      {children}
      </button>

      {open && (
        <div className="absolute mt-2 w-30 bg-[#262626] border rounded shadow">
          <div
            onClick={() => handleSelect(By.TASK_CREATION_DATE)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center "
          >
           <span>Date</span>
          </div>
          <div
            onClick={() => handleSelect(By.TASK_PRIORITY)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
           <span>Priority</span>
          </div>
          <div
            onClick={() => handleSelect(By.TASK_ID)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
           <span>Sort(Default)</span>
          </div>

        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { CiFlag1 } from "react-icons/ci";
import { TaskPriority } from '../../types/TaskPriority';

export type sortOrder = "asc"|"desc";

type SortOrderDDListProps = {
    children:React.ReactNode;
    onSelect:(item:sortOrder)=>void;
}

export default function SortOrderDDList({children,onSelect}:SortOrderDDListProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item:sortOrder) => {
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
            onClick={() => handleSelect("asc")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center "
          >
           <span>Ascending</span>
          </div>
          <div
            onClick={() => handleSelect("desc")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
           <span>Descending</span>
          </div>
          
        </div>
      )}
    </div>
  );
}

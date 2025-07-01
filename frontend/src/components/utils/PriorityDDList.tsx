import { useState } from 'react';
import { CiFlag1 } from "react-icons/ci";
import { TaskPriority } from '../../types/TaskPriority';

type PriorityDropDownListProps = {
    children:React.ReactNode;
    onSelect:(item:TaskPriority)=>void;
}

export default function PriorityDropDownList({children,onSelect}:PriorityDropDownListProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item:TaskPriority) => {
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
        <div className="absolute mt-2 w-48 bg-[#262626] border rounded shadow">
          <div
            onClick={() => handleSelect(TaskPriority.HIGH)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center "
          >
            <CiFlag1 className="text-red-500 text-2xl mx-2"/>
           <span>High</span>
          </div>
          <div
            onClick={() => handleSelect(TaskPriority.MEDIUM)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
            <CiFlag1 className="text-orange-500 text-2xl mx-2"/>
           <span>Medium</span>
          </div>
          <div
            onClick={() => handleSelect(TaskPriority.LOW)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
            <CiFlag1 className="text-blue-500 text-2xl mx-2"/>
           <span>Low</span>
          </div>
        </div>
      )}
    </div>
  );
}

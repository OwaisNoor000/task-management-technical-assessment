import { useState } from 'react';
import { CiFlag1 } from "react-icons/ci";

type PriorityDropDownListProps = {
    children:React.ReactNode;
}

export default function PriorityDropDownList({children: child}:PriorityDropDownListProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item:any) => {
    console.log('Selected:', item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-gray-300">
      <button
        onClick={() => setOpen(!open)}
      >
      {child}
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-[#262626] border rounded shadow">
          <div
            onClick={() => handleSelect('Option 1')}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center "
          >
            <CiFlag1 className="text-red-500 text-2xl mx-2"/>
           <span>High</span>
          </div>
          <div
            onClick={() => handleSelect('Option 2')}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
          >
            <CiFlag1 className="text-orange-500 text-2xl mx-2"/>
           <span>Medium</span>
          </div>
          <div
            onClick={() => handleSelect('Option 3')}
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

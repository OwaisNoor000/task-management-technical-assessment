import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Task(){
    const [editDeleteIconVisibility,setEditDeleteIconVisibility] = useState<"none"|"block">("none");
    const toggleEditDeleteVisibility = ()=>{
        console.log("works")
        editDeleteIconVisibility==="none"?setEditDeleteIconVisibility("block"):setEditDeleteIconVisibility("none");
    }

    return(
        <div className="" onMouseEnter={()=>setEditDeleteIconVisibility("block")} 
        onMouseLeave={()=>setEditDeleteIconVisibility("none")}>
            <div className="flex flex-row items-start p-2">
                <input
                    type="checkbox"
                    className="appearance-none mt-8
                    w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500 checked:border-blue-500 focus:outline-none
                    hover:cursor-pointer"
                    />
                <div className="flex flex-col p-6 w-full">
                    <div className="w-full flex flex-row justify-between">
                        <span className="text-2xl text-white pb-1">This is a Task</span>
                        <div className="flex flex-row">
                            <MdEdit className="text-2xl text-gray-500 mx-2 hover:cursor-pointer" style={{display:editDeleteIconVisibility}}/>
                            <MdDelete className="text-2xl text-gray-500 mx-2 hover:cursor-pointer" style={{display:editDeleteIconVisibility}}/>
                        </div>
                    </div>
                    <span className="text-xl text-gray-300 pb-2">This is a task description</span>
                    <span className="text-[#DE4C4A]">Nov 30 2025</span>
                    <hr className="text-gray-300 my-1"/>
                </div>
            </div>
        </div>
    )
}
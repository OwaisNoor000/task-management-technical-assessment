import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TaskPriority } from "../types/TaskPriority";
import type { TaskStatusEnum } from "../types/TaskStatusEnum";
import { FaCheckDouble } from "react-icons/fa6";
import { CiFlag1 } from "react-icons/ci";


type TaskProps = {
    id:number,
    title:string,
    description:string,
    priority:TaskPriority,
    status:TaskStatusEnum,
    lastModified:string,
    editTaskFunc:(taskId:number)=>void;
}

export default function Task({id, title, description, priority, status, lastModified,editTaskFunc}: TaskProps){
    const [editDeleteIconVisibility,setEditDeleteIconVisibility] = useState<"none"|"block">("none");
    const [checkBoxColor,setCheckBoxColor] = useState<"red"|"orange"|"blue">("blue");
    const [checked, setChecked] = useState(false);  // Add checked state

    useEffect(()=>{
        if(priority === TaskPriority.HIGH){
            setCheckBoxColor("red");
        } else if(priority === TaskPriority.MEDIUM){
            setCheckBoxColor("orange");
        } else if(priority === TaskPriority.LOW){
            setCheckBoxColor("blue");
        }
    }, [priority])

    const toggleChecked = () => {
        setChecked(prev => !prev);
    }

    const toLocaleDate = (isoString:string)=>{
        const date = new Date(isoString);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
    }

    // Map checkBoxColor to tailwind class
    const bgColorClass = checked 
        ? (checkBoxColor === "red" ? "bg-red-500 border-red-500" 
          : checkBoxColor === "orange" ? "bg-orange-500 border-orange-500" 
          : "bg-blue-500 border-blue-500")
        : "bg-white border-gray-400";

    return (
        <div 
          onMouseEnter={()=>setEditDeleteIconVisibility("block")} 
          onMouseLeave={()=>setEditDeleteIconVisibility("none")} 
          key={id}
        >
            <div className="flex flex-row items-start p-2">
                <input
                    type="checkbox"
                    checked={checked}                
                    onChange={toggleChecked}      
                    className={`appearance-none mt-8 w-5 h-5 rounded-full border focus:outline-none cursor-pointer  
                                ${bgColorClass}`}
                />
                <div className="flex flex-col p-6 w-full">
                    <div className="w-full flex flex-row justify-between">
                        <span className="text-2xl text-white pb-1">{title}</span>
                        <div className="flex flex-row">
                            <MdEdit onClick={()=>editTaskFunc(id)}
                                className="text-2xl text-gray-500 mx-2 hover:cursor-pointer" style={{display:editDeleteIconVisibility}}/>
                            <FaCheckDouble
                            className="text-2xl text-gray-500 mx-2 hover:cursor-pointer" style={{display:editDeleteIconVisibility}}/>
                        </div>
                    </div>
                    <span className="text-xl text-gray-300 pb-2">{description}</span>
                    <span className="text-[#DE4C4A] flex flex-row items-center">
                        last modified: {toLocaleDate(lastModified)}
                        <div className="flex flex-row items-ned justify-center border-1 rounded-lg border-gray-500
                                        space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2 w-16">
                            <span className="text-white">{priority}</span>
                        </div>
                        </span>
                    <hr className="text-gray-300 my-1"/>
                </div>
            </div>
        </div>
    )
}

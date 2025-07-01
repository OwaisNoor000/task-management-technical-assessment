import AutoresizeInput from "./utils/AutoresizeInput";
import { IoTodayOutline } from "react-icons/io5";
import { CiFlag1 } from "react-icons/ci";
import PriorityDropDownList from "./utils/PriorityDDList";
import CalendarDropdown from "./utils/CalenderDD";
import { TaskPriority } from "../types/TaskPriority";
import { useEffect, useState } from "react";

type TaskFormProps = {
    id?:number,
    title?:string,
    description?:string,
    priority?:TaskPriority,
    saveFunc?:()=>void;
    cancelFunc?:()=>void;
}

export default function TaskForm({id,title,description,priority,saveFunc,cancelFunc}:TaskFormProps){
    const [chosenId,setChosenId] = useState(id);
    const [chosenTitle,setChosenTitle] = useState(title);
    const [chosenDescription,setChosenDescription] = useState(description);
    const [chosenPriority,setChosenPriority] = useState(priority);
    
    // Keep the states in sync with the params during component render
    useEffect(() => {
    setChosenDescription(description);
    }, [description]);

    useEffect(() => {
    setChosenPriority(priority);
    }, [priority]);

        useEffect(() => {
        id===undefined?setChosenId(0):setChosenId(id);
    }, [id]);

        useEffect(() => {
        id===undefined?setChosenTitle(""):setChosenTitle(title);
    }, [title]);

    return (
        <div className="w-[1000px] border-2 border-gray-300 flex flex-col rounded-xl h-fit mt-4
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]">
           <input className="border-0 focus:outline-none w-full h-10 my-1 text-gray-300 pl-4
           text-lg font-bold" placeholder="Enter an actionable Task" defaultValue={chosenTitle}/>
           <AutoresizeInput className="border-0 focus:outline-none h-9 my-1 text-gray-400 pl-4
           text-lg max-h-[200px] resize-none overflow-hidden" placeholder="Description"
           defaultValue={chosenDescription}/>
           
           <div className="flex flex-row m-3">
                
                <PriorityDropDownList onSelect={setChosenPriority}>
                    <div className="flex flex-row items-ned justify-center border-1 rounded-lg p-2 border-gray-500
                space-x-3 hover:bg-gray-500 hover:cursor-pointer m-2">
                        <CiFlag1 className="text-white text-2xl"/>
                        <span className="text-white">{chosenPriority}</span>
                    </div>
                </PriorityDropDownList>
           </div>
           <div>
                <hr className="text-white"/>
                <div className="flex flex-row justify-end items-center p-3">
                    <button className="py-2 px-4 m-3 m rounded-lg bg-gray-500 font-bold text-white
                    hover:bg-gray-400 hover:cursor-pointer" onClick={cancelFunc}>Cancel</button>
                    <button className="py-2 px-4 m-3 m rounded-lg bg-[#DE4C4A] font-bold text-white
                    hover:bg-red-400 hover:cursor-pointer" onClick={saveFunc}>Save Task</button>
                </div>
           </div>
        </div>
    )
}
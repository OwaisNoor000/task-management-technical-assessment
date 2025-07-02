import AutoresizeInput from "./utils/AutoresizeInput";
import { IoTodayOutline } from "react-icons/io5";
import { CiFlag1 } from "react-icons/ci";
import PriorityDropDownList from "./utils/PriorityDDList";
import CalendarDropdown from "./utils/CalenderDD";
import { TaskPriority } from "../types/TaskPriority";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../hooks/TaskContext";
import { TaskResponse, TaskUpdateRequest } from "../types/TaskDto";

type TaskFormProps = {
    saveFunc?:(task:TaskUpdateRequest)=>void;
    cancelFunc?:()=>void;
}

export default function TaskForm({saveFunc,cancelFunc}:TaskFormProps){
    const {taskData,setTaskData} = useContext(TaskContext);
    const [chosenId,setChosenId] = useState(taskData.taskToUpdate.id);
    const [chosenTitle,setChosenTitle] = useState(taskData.taskToUpdate.title);
    const [chosenDescription,setChosenDescription] = useState(taskData.taskToUpdate.description);
    const [chosenPriority,setChosenPriority] = useState(taskData.taskToUpdate.priority);
    
    // Sync the states with context values
    useEffect(() => {
        setChosenId(taskData.taskToUpdate.id);
        setChosenTitle(taskData.taskToUpdate.title);
        setChosenDescription(taskData.taskToUpdate.description);
        setChosenPriority(taskData.taskToUpdate.priority);
    }, [taskData.taskToUpdate]);
    

    const saveFuncLocal = ()=>{
        console.log("saveFuncLocal");
        console.log(chosenTitle);
        const updatedTask:TaskUpdateRequest = {
                    id:chosenId,
                    description:chosenDescription,
                    title:chosenTitle,
                    priority:chosenPriority,
                    status:taskData.taskToUpdate.status
                }
        console.log(updatedTask)

        // Update the context
        setTaskData(prev=>(
            {
                ...prev,
                taskToUpdate:updatedTask
            }
         ));
         saveFunc!==undefined?saveFunc(updatedTask):console.log("TaskForm.savefunc is undefined");
    }

    return (
        <div className="w-[1000px] border-2 border-gray-300 flex flex-col rounded-xl h-fit mt-4
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e1e1e]">
           <input className="border-0 focus:outline-none w-full h-10 my-1 text-gray-300 pl-4
           text-lg font-bold" placeholder="Enter an actionable Task" defaultValue={chosenTitle} 
           onChange={e=>{setChosenTitle(e.target.value)}}/>
           <AutoresizeInput className="border-0 focus:outline-none h-9 my-1 text-gray-400 pl-4
           text-lg max-h-[200px] resize-none overflow-hidden" placeholder="Description"
           defaultValue={chosenDescription} setValue={setChosenDescription}/>
           
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
                    hover:bg-red-400 hover:cursor-pointer" onClick={saveFuncLocal}>Save Task</button>
                </div>
           </div>
        </div>
    )
}
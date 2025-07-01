import Task from "./Task";
import { IoMdAdd } from "react-icons/io";
import TaskForm from "./TaskForm";
// import { TaskResponse } from "../types/TaskDto";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../hooks/TaskHooks";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { Provider } from "./ui/provider";
import { FaSpinner } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { TaskPriority } from "../types/TaskPriority";



export default function TaskInbox(){
    const [loading,setLoading] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const [chosenId,setChosenId] = useState(0);
    const [chosenTitle,setChosenTitle] = useState("");
    const [chosenDescription,setChosenDescription] = useState("");
    const [chosenPriority,setChosenPriority] = useState(TaskPriority.LOW);

    const {status,error,data} = useQuery({
        queryKey:["tasks"],
        queryFn:getAllTasks
    });
    
    useEffect(() => {
        setLoading(status === "pending");
    }, [status]);

    if(status==="error"){
        console.log(error);
    }

    if(status==="success"){
        console.log(data);
    }

    const editTask = (id:number)=>{
        if(editMode===true){
            return;
        }
        if(data===undefined){return}
        for(const task of data){
            setChosenId(task.id);
            setChosenDescription(task.description);
            setChosenTitle(task.title);
            setChosenPriority(task.priority);
        }

        setEditMode(true); 

    }
    
    const closeEdit = ()=>{
        setEditMode(false);
    }

    


    return (
        <div className="w-2/3 min-h-[500px] mt-24  p-4 overflow-scroll overflow-x-hidden scroll
        custom-scrollbar">
            <span className="text-4xl font-bold text-white flex flex-row items-center">
                Inbox
                { loading && <ClipLoader color="white" cssOverride={{margin:"0 20px 0 20px"}}/>}
                </span>
            {data!==undefined && data.map(t=>(
                <Task id={t.id} title={t.title} description={t.description} status={t.status} priority={t.priority} lastModified={t.updated_at}
                editTaskFunc={()=>editTask(t.id)}/>
            ))}

            <div className="flex flex-row items-center text-xl text-gray-300 hover:text-[#DE4C4A] hover:cursor-pointer">
                <IoMdAdd className="text-gray-300 mx-2 text-2xl"/>
                <span className="">Add Task</span>
            </div>
            <span style={{display:editMode?"block":"none"}}>
            <TaskForm cancelFunc={closeEdit} id={chosenId} description={chosenDescription} priority={chosenPriority}
            title={chosenTitle}/>
            </span>
        </div>
    )
}
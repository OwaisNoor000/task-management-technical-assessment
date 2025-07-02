import "../output.css";
import Avatar from "./Avatar";
import {BellIcon,HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Menu} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import TaskContextProvider, { TaskContext } from "../hooks/TaskContext";
import { FaTasks } from "react-icons/fa";
import { TaskStatusEnum } from "../types/TaskStatusEnum";

export default function Sidebar(){
    const {taskData,setTaskData} = useContext(TaskContext);
    const [selected,setSelected] = useState(1);
    
    useEffect(()=>{
        let newFilter:null|TaskStatusEnum = null;
        if(selected===2){
            newFilter = TaskStatusEnum.PENDING;
        }else if(selected===3){
            newFilter = TaskStatusEnum.INPROGRESS;
        }else if(selected===4){
            newFilter = TaskStatusEnum.COMPLETED;
        }else if(selected===1){
            newFilter = null;
        }

        setTaskData(prev=>(
            {
                ...prev,
                filter:newFilter
            }
        ));
    },[selected]);
    

    return(
        <div className="h-full w-[400px] bg-[#262626] p-4 ">
            <div className="flex flex-row justify-between">
                <Avatar />
                <div className="flex flex-row items-center">
                    <BellIcon className={"w-[30px] h-[30px] text-gray-300 m-2"}/>
                    <HamburgerMenuIcon className="w-[30px] h-[30px] text-gray-300 m-2"/>
                </div>
            </div>
            <div className="h-10"></div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer"
            onClick={()=>setSelected(1)}>
                <span className={selected===1?"w-10":""}></span>
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">All Tasks</span>
            </div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer"
            onClick={()=>setSelected(2)}>
                <span className={selected===2?"w-10":""}></span>
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">To Do</span>
            </div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer"
            onClick={()=>setSelected(3)}>
                <span className={selected===3?"w-10":""}></span>
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">In Progress</span>
            </div>
            <div className="flex flex-row justify-start items-center w-full hover:bg-[#322F2A] hover:cursor-pointer"
            onClick={()=>setSelected(4)}>
                <span className={selected===4?"w-10":""}></span>
                <IoIosAddCircle className="w-[40px] h-[40px]  m-2 text-[#DE4C4A]"/>
                <span className="text-lg text-white font-bold">Completed</span>
            </div>


        </div>
    )
}
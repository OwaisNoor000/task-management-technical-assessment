import React, { createContext, ReactNode, useState } from "react";
import { TaskUpdateRequest } from "../types/TaskDto"
import { TaskStatusEnum } from "../types/TaskStatusEnum";
import { TaskPriority } from "../types/TaskPriority";



export type TaskData = {
    taskToUpdate:TaskUpdateRequest, // Can be a new or modified task
}

export interface TaskContextInterface{
    taskData:TaskData,
    setTaskData:React.Dispatch<React.SetStateAction<TaskData>>
}

const defaultState = {
    taskData:{
    taskToUpdate:{id:-1,
          title: "",
          description:"",
        status: TaskStatusEnum.PENDING,
        priority: TaskPriority.LOW,
        }
    } as TaskData,
    setTaskData:(taskData:TaskData)=>{},
} as TaskContextInterface;

export const TaskContext = createContext(defaultState);

type TaskContextProviderProps = {
    children:ReactNode;
}

export default function TaskContextProvider({children}:TaskContextProviderProps){
    const [taskData,setTaskData] = useState<TaskData>(
        {taskToUpdate:{id:-1,title:"",description:"",status:TaskStatusEnum.PENDING,priority:TaskPriority.LOW}}
    );

    return(
        <TaskContext.Provider value={{taskData,setTaskData}}>
            {children}
        </TaskContext.Provider>
    )
}
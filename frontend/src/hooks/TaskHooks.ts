import axios from "axios";
import type { TaskResponse } from "../types/TaskDto";

export const getAllTasks:()=>Promise<TaskResponse[]> = async()=>{
    return axios.get<TaskResponse[]>("http://localhost:3000/api/tasks",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    }).then(
       (response)=>{return response.data}
    )
}
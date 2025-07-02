import axios from "axios";
import type { TaskResponse, TaskUpdateRequest } from "../types/TaskDto";

export const getAllTasks:({queryKey}:{queryKey:any[]})=>Promise<TaskResponse[]> = async({queryKey}:{queryKey:any[]})=>{
    const [x,sortBy, sortOrder,taskStatus] = queryKey;
    let params = {}
    if(taskStatus!==null){
        params =  { sortBy, sortOrder,"status":taskStatus}
    }else{
        params =  { sortBy, sortOrder,}
    }
    return axios.get<TaskResponse[]>("http://localhost:3000/api/tasks",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params:params
        

    }).then(
       (response)=>{return response.data}
    )
}

export const updateTask:(val:Partial<TaskUpdateRequest>)=>Promise<TaskResponse> = async(updateRequest:Partial<TaskUpdateRequest>)=>{
    const headers = {
        Authorization:"Bearer " + localStorage.getItem("token")
    }
    return axios.put<TaskResponse>(`http://localhost:3000/api/tasks/${updateRequest.id}`,updateRequest,{headers})
        .then((response)=>{return response.data});       
}

export const saveTask:(val:TaskUpdateRequest)=>Promise<TaskResponse> = async(req:TaskUpdateRequest)=>{
    const headers = {
        Authorization:"Bearer " + localStorage.getItem("token")
    }
    return axios.post<TaskResponse>(`http://localhost:3000/api/tasks`,req,{headers})
        .then((response)=>{return response.data});
}
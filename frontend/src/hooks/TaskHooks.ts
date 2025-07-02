import axios from "axios";
import type { TaskResponse, TaskUpdateRequest } from "../types/TaskDto";

export const getAllTasks:({queryKey}:{queryKey:any[]})=>Promise<TaskResponse[]> = async({queryKey}:{queryKey:any[]})=>{
    const [x,sortBy, sortOrder] = queryKey;
    return axios.get<TaskResponse[]>("http://localhost:3000/api/tasks",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        },
        params: { sortBy, sortOrder }

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
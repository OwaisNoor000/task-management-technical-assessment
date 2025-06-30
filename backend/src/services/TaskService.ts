import { runEvaluator } from "../../../../../../../node_modules/langsmith/dist/evaluation/evaluator";
import * as taskDao from "../daos/TaskDao";
import { Task } from "../models/Task";
import AppError, { CustomError } from "../types/AppError";
import { TaskCreationRequest, TaskResponseDto, TasksRequestDto, TaskUpdateRequest } from "../types/TaskDto";
import { TaskStatusEnum } from "../types/TaskStatusEnum";


export const getTasks:(val:TasksRequestDto)=>Promise<TaskResponseDto[]> = async (taskRequest:TasksRequestDto)=>{
    try{
       const tasks:Task[] = await taskDao.getTasksByCriteria(taskRequest);
       let taskResponses:TaskResponseDto[] = [];
       for(const task of tasks){
            let taskResponse:TaskResponseDto = {id:task.taskId==null?-1:task.taskId,
                title:task.title,status:task.status,created_at:task.dateCreated,
                description:task.description,priority:task.priority_1,updated_at:task.dateUpdated,
                user_id:task.userId
            }
            taskResponses.push(taskResponse);
       }
       return taskResponses;

    }catch(err){
        console.log(err);
        return [];
    }
}


export const createTask:(val:TaskCreationRequest)=>Promise<TaskResponseDto> = async (taskRequest:TaskCreationRequest)=>{
    let newTask:Task = new Task(null,taskRequest.title,taskRequest.description,taskRequest.status,taskRequest.user_id,taskRequest.priority);
    
    const createdTask:Task = await taskDao.createTask(newTask);
    const response:TaskResponseDto = {
        id:createdTask.taskId===null?-1:createdTask.taskId,
        title: createdTask.title,
        description: createdTask.description,
        status: createdTask.status,
        priority: createdTask.priority_1,
        user_id:createdTask.userId,
        created_at:createdTask.dateCreated,
        updated_at:createdTask.dateUpdated
    }
    return response;
}

export const updateTask:(val:Partial<TaskUpdateRequest>)=>Promise<TaskResponseDto> = async(taskRequest:Partial<TaskUpdateRequest>)=>{
    let partialTask:Partial<Task> = {};
    if(taskRequest.id===undefined){
        throw new AppError(CustomError.UPDATE_REQUEST_MISSING_ID,"update request");
    }
    partialTask.taskId = taskRequest.id;
    
    if(taskRequest.description!==undefined){
        partialTask.description = taskRequest.description;
    }
    if(taskRequest.title!==undefined){
        partialTask.title = taskRequest.title;
    }
    if(taskRequest.status!==undefined){
        partialTask.status = taskRequest.status;
    }
    if(taskRequest.priority!==undefined){
        partialTask.priority_1 = taskRequest.priority;
    }
    
    const updatedTask:Task = await taskDao.updateTask(partialTask);

    const response:TaskResponseDto = {
        id:updatedTask.taskId===null?-1:updatedTask.taskId,
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        priority: updatedTask.priority_1,
        user_id:updatedTask.userId,
        created_at:updatedTask.dateCreated,
        updated_at:updatedTask.dateUpdated
    }
    return response;
}
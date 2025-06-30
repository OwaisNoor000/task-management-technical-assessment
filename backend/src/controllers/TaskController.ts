import { By } from "../types/By";
import { FilterOperation, QueryOperation, SliceOperation, SortOperation, TaskQueryOperations } from "../types/QueryOperation";
import { TaskCreationRequest, TaskResponseDto, TasksRequestDto, TaskUpdateRequest } from "../types/TaskDto";
import {TaskPaginateParams, TaskSortParams} from "../types/TaskParams";
import {Response,Request} from "express";
import * as taskService from "../services/TaskService";

export async function getTasks(req:Request,res:Response){
    // Extract query params
    const filterOperations:FilterOperation[] = [];
    for(const[key,value] of Object.entries(By)){
        const arg = req.query[String(value)] as string|undefined;
        // Not all parameters may be defined in the url
        if (arg!==undefined){
            const filter:FilterOperation = {type:QueryOperation.FILTER,by:value,value:arg};
            filterOperations.push(filter);
        }
    }

    let sortOperation:SortOperation|undefined = undefined;
    const columnName:string|undefined = req.query[TaskSortParams.SORT_BY] as string|undefined;
    const columnValue:"asc"|"desc"|undefined = req.query[TaskSortParams.SORT_ORDER] as "asc"|"desc"|undefined;

    if(columnName!==undefined){
        // Iterate over By enum to match value with column Name 
        // We use a loop Because TS enums do not support string to enum conversions
        for(const [key,value] of Object.entries(By)){
            if(columnName===value){
                sortOperation = {type:QueryOperation.SORT,by:value,order:columnValue} as SortOperation;
                break; // We can only sort by one column
            }
        }
    }
    
    
    let paginateOperation:SliceOperation|undefined = undefined;
    const page:number|undefined = req.query[TaskPaginateParams.PAGE] as number|undefined;
    const pageSize:number|undefined = req.query[TaskPaginateParams.PAGE_SIZE] as number|undefined;
    if(page!==undefined && pageSize!=undefined){
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        paginateOperation = {type:QueryOperation.SLICE,limit:limit,offset:offset};
    }

    const taskQueryOperations: TaskQueryOperations = {
        ...(filterOperations !== undefined && { filter: filterOperations }),
        ...(sortOperation !== undefined && { sort: sortOperation }),
        ...(paginateOperation !== undefined && { slice: paginateOperation }),
        };

    // Extract url params
    const userId:number = parseInt(req.params.id,10);

    try{
        const tasksRequest:TasksRequestDto = {userId:userId,queryOperations:taskQueryOperations};
        const tasks:TaskResponseDto[] = await taskService.getTasks(tasksRequest);
        return res.status(200).json(tasks);
    }catch(err){
        console.log(err);
        return res.status(500).json({});
    }
}

export async function createTask(req:Request,res:Response){
    const taskCreationRequest:TaskCreationRequest = req.body;
    try{
        const createdTask:TaskResponseDto = await taskService.createTask(taskCreationRequest); 
        return res.status(201).json(createdTask);
    }catch(err){
        console.log(err);
        return res.status(500).json({});
    }
}


export async function updateTask(req:Request,res:Response){
    const taskId:number = parseInt(req.params.id,10)
    const taskUpdateRequest:Partial<TaskUpdateRequest> = req.body;
    taskUpdateRequest.id = taskId;
    try{
        const partialTask:TaskResponseDto = await taskService.updateTask(taskUpdateRequest);
        return res.status(201).json(partialTask);
    }catch(err){
        console.log(err);
        return res.status(500).json({"err":String(err)});
    }
}

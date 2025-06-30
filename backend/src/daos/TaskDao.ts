import { TaskStatusEnum } from "../types/TaskStatusEnum";
import { query } from "./index";
import { By } from "../types/By";
import { TaskQueryOperations } from "../types/QueryOperation";
import format from "pg-format";
import { Task } from "../models/Task";
import AppError, { CustomError } from "../types/AppError";
import { TasksRequestDto } from "../types/TaskDto";


export const  getTasksByCriteria:(val:TasksRequestDto)=>Promise<Task[]> =
async (taskRequest:TasksRequestDto)=>{
    let userId:number = taskRequest.userId;
    let operations:TaskQueryOperations = taskRequest.queryOperations;


    //let queryString:string[] = ["SELECT * FROM tasks where user_id = ${userId}"]
    let queryString:string = "SELECT * FROM tasks where user_id = %L";
    let queryArgs:string[] = [String(userId)];

    //Filter operations 
    // (Note that it is the first operation because we want to filter before any operations)
    if(operations.filter && operations.filter.length!==0){
        for(const filter of operations.filter){
            queryString+=" and %s = %L";
            queryArgs.push(filter.by);
            queryArgs.push(filter.value);
        }
    }

    // Sort operations 
    if (operations.sort){
        const additionalString = ` ORDER BY ${operations.sort.by} ${operations.sort.order}`
        queryString+=" ORDER BY %s %s";
        queryArgs.push(operations.sort.by);
        queryArgs.push(operations.sort.order===undefined?"asc":operations.sort.order);
    }

    //Slice operation
    if(operations.slice){
        const additionalString = ` OFFSET ${operations.slice.offset} LIMIT ${operations.slice.limit}`
        queryString+=" OFFSET %s LIMIT %s";
        queryArgs.push(String(operations.slice.offset));
        queryArgs.push(String(operations.slice.limit));
    }
    
    // pg-admin.format to create a sql-injection-safe query. 
    // normal pg package does not allow dynamic sql query creation.
    let finalQueryString = format(queryString,...queryArgs);
    console.log("DAO");
    console.log(finalQueryString);
    const result = await query(finalQueryString);

    if(result===null || result.rowCount===null){
        throw new AppError(CustomError.DATABASE_ERROR,"DB did not return anything after statement execution");
    }

    if(result.rowCount===null){
        return [];
    }

    let response = result.rows;
    let tasks:Task[] = [];
    let i=0;
    while(i<response.length){
        let task = new Task(response[i].id,response[i].title,response[i].description,
            response[i].status,response[i].owner,response[i].priority,
            response[i].created_at,response[i].updated_at);
        tasks.push(task);
        i++;
    }
    return tasks;
    
}

export const createTask:(val:Task)=>Promise<Task> = async (task:Task)=>{
    const result = await query(
    `
    INSERT INTO tasks (title, description, status, priority, user_id, created_at, updated_at)
    VALUES ($1, $2, $3,$4,$5,$6,$7)
    RETURNING id, title, description, status, priority, user_id, created_at, updated_at
    `,
    [task.title,task.description,task.status,task.priority_1,String(task.userId),task.dateCreated,task.dateUpdated]
    );
    

    if(result===null || result.rowCount===null || result.rowCount==0){
        throw new AppError(CustomError.DATABASE_ERROR,"DB did not return anything after statement execution");
    }
    
    let response = result.rows[0]
    let createdTask:Task = new Task(response.id,response.title,response.description,response.status,response.owner,response.priority);
    return createdTask;
}


export const updateTask:(val:Partial<Task>)=>Promise<Task> = async(partialTask:Partial<Task>)=>{

    // Build SET clause dynamically
    let setClauses: string[] = [];
    let setValues: (string | number)[] = [];

    if (partialTask.title !== undefined) {
        setClauses.push(format('%I = %L', 'title', partialTask.title));
    }
    if (partialTask.description !== undefined) {
        setClauses.push(format('%I = %L', 'description', partialTask.description));
    }
    if (partialTask.status !== undefined) {
        setClauses.push(format('%I = %L', 'status', partialTask.status));
    }
    if (partialTask.priority_1 !== undefined) {
        setClauses.push(format('%I = %L', 'priority', partialTask.priority_1));
    }
    if (partialTask.userId !== undefined) {
        setClauses.push(format('%I = %L', 'user_id', partialTask.userId));
    }

    // Always update updated_at
    setClauses.push(format('%I = %L', 'updated_at', new Date().toISOString()));

    if (setClauses.length === 0) {
        throw new Error('No fields to update');
    }

    // Compose final query using pg-format
    const queryString = format(
        `UPDATE tasks SET %s WHERE id = %L RETURNING id, title, description, status, priority, user_id, created_at, updated_at`,
        setClauses.join(', '),
        partialTask.taskId
    );

    console.log('DAO updateUser query:', queryString);

    const result = await query(queryString);

    if (!result || !result.rows || result.rows.length === 0) {
        throw new Error(`Task with id ${partialTask.taskId} not found or update failed`);
    }

    const row = result.rows[0];

    return new Task(
        row.id,
        row.title,
        row.description,
        row.status,
        row.user_id,
        row.priority,
        row.created_at,
        row.updated_at
    );
}
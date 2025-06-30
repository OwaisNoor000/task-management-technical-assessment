import { TaskQueryOperations } from "./QueryOperation";
import { TaskPriority } from "./TaskPriority";
import { TaskStatusEnum } from "./TaskStatusEnum";

export interface TaskCreationRequest{
      title: string;
      description: string;
      status: TaskStatusEnum;
      priority: TaskPriority;
      user_id:number;
}


export interface TaskUpdateRequest{
      id:number;
      title: string;
      description: string;
      status: TaskStatusEnum;
      priority: TaskPriority;
}


export interface TaskResponseDto{
      id: number;
      title: string;
      description: string;
      status: TaskStatusEnum;
      priority: TaskPriority;
      created_at: string;
      updated_at: string;
      user_id:number;
}


export interface TasksRequestDto{
      userId:number;
      queryOperations:TaskQueryOperations;
}
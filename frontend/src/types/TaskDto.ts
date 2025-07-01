import {TaskStatusEnum} from "./TaskStatusEnum";
import {TaskPriority} from "./TaskPriority";

export interface TaskResponse{
      id: number;
      title: string;
      description: string;
      status: TaskStatusEnum;
      priority: TaskPriority;
      created_at: string;
      updated_at: string;
      user_id:number;
}


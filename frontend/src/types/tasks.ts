export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority =  "low" | "normal" | "high";

export interface Task {
 id: number;           
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "normal" | "high" | string;
  isCompleted?: boolean; 
    userId: number;
  createdAt?: string;    
  updatedAt?: string;
}
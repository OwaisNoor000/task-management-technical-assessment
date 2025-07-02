import * as z from "zod/v4";
import { TaskStatusEnum } from "./TaskStatusEnum";
import { TaskPriority } from "./TaskPriority";



const TaskStatusEnumSchema = z.nativeEnum(TaskStatusEnum);
const TaskPrioritySchema = z.nativeEnum(TaskPriority);


export const TaskCreationRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: TaskStatusEnumSchema,
  priority: TaskPrioritySchema,
  user_id: z.number(),
});

export const TaskUpdateRequestSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: TaskStatusEnumSchema.optional(),
  priority: TaskPrioritySchema.optional(),
});



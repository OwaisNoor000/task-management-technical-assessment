import express from "express";
import { asyncHandler } from "../utils/GeneralUtil";
import * as taskController from "../controllers/TaskController";
import { validateSchema } from "../middleware/ReqValidationMiddleware";
import { TaskCreationRequestSchema, TaskUpdateRequestSchema } from "../types/TaskSchema";
import { authenticateJWT } from "../middleware/JwtAuthMiddleware";

const taskRouter = express.Router();

taskRouter.get("/",authenticateJWT,asyncHandler(taskController.getTasks));
taskRouter.post("/",authenticateJWT,validateSchema(TaskCreationRequestSchema),asyncHandler(taskController.createTask));
taskRouter.put("/:id",authenticateJWT,validateSchema(TaskUpdateRequestSchema),asyncHandler(taskController.updateTask));
// taskRouter.delete("/:id",asyncHandler(asyncHandler(taskController.deleteTask)));

export default taskRouter;
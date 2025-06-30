import express from "express";
import { asyncHandler } from "../utils/GeneralUtil";
import * as taskController from "../controllers/TaskController";

const taskRouter = express.Router();

taskRouter.get("/:id",asyncHandler(asyncHandler(taskController.getTasks)));
taskRouter.post("/",asyncHandler(asyncHandler(taskController.createTask)));
taskRouter.put("/:id",asyncHandler(asyncHandler(taskController.updateTask)));
// taskRouter.delete("/:id",asyncHandler(asyncHandler(taskController.deleteTask)));

export default taskRouter;
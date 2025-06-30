import express from "express";
import * as userController from "../controllers/UserController";
import { asyncHandler } from "../utils/GeneralUtil";

const userRouter = express.Router();

// We use asyncHandler beacuse the controller functions return Promises<> which ExpressJs does not allow
userRouter.post("/register",asyncHandler(userController.register));
userRouter.post("/login",asyncHandler(userController.login));
userRouter.get("/profile/:id",asyncHandler(userController.getUserProfile));


export default userRouter;
import express from "express";
import * as userController from "../controllers/UserController";
import { asyncHandler } from "../utils/GeneralUtil";
import { LoginRequestSchema, UserRequestSchema } from "../types/UserSchema";
import { validateSchema } from "../middleware/ReqValidationMiddleware";
import { authenticateJWT } from "../middleware/JwtAuthMiddleware";

const userRouter = express.Router();

// We use asyncHandler beacuse the controller functions return Promises<> which ExpressJs does not allow
userRouter.post("/register",validateSchema(UserRequestSchema),asyncHandler(userController.register));
userRouter.post("/login",validateSchema(LoginRequestSchema),asyncHandler(userController.login));
userRouter.get("/profile",authenticateJWT,asyncHandler(userController.getUserProfile));


export default userRouter;
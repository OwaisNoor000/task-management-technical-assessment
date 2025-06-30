import express from "express";
import userRouter from "../routes/UserRoutes";
import taskRouter from "./TaskRoutes";

const app = express();
app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/tasks",taskRouter);
app.listen(3000);

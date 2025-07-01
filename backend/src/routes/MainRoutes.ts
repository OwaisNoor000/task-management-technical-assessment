import express from "express";
import userRouter from "../routes/UserRoutes";
import taskRouter from "./TaskRoutes";
import cors from "cors";
import { corsMiddleware } from "../middleware/CorsMiddleware";

const app = express();
app.use( cors({ origin: 'http://localhost:5173' }))

app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/tasks",taskRouter);
app.listen(3000);

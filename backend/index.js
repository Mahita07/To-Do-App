import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {userRouter} from "./routes/userRouter.js";
import { taskRouter } from './routes/taskRouter.js';
mongoose.connect(
    "mongodb+srv://Mahita07:dbpassword@cluster0.kvbh5.mongodb.net/todoApp?retryWrites=true&w=majority"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/task",taskRouter);
app.listen(3001, () => console.log("Welcome to  my To Do !"));
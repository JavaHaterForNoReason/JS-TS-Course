import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

import "./src/database";

import express from "express";
import homeRouter from "./src/routes/home";
import userRouter from "./src/routes/user";
import loginRouter from "./src/routes/login";
import studentRouter from "./src/routes/student";
import uploadRouter from "./src/routes/upload";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, "uploads")));
app.use("/", homeRouter);
app.use("/users/", userRouter);
app.use("/login/", loginRouter);
app.use("/student/", studentRouter);
app.use("/upload/", uploadRouter);

export default app;

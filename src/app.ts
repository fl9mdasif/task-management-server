/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import express, { Application, Request, Response } from "express";
import router from "./app/router";

const app: Application = express();

// parser middleware
app.use(express.json());
app.use(cors());

// application routes
// /api/v1/students/create-student
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Task management");
});

app.use(notFound);

// global err handler middleware. must declare it in the last off the file
app.use(globalErrorHandler);

export default app;

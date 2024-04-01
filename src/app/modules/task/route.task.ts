import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TaskController } from "./controller.task";
import { TaskValidationSchema } from "./validation.task";

const router = express.Router();

// register a user
router.post(
  "/create-task",
  validateRequest(TaskValidationSchema.createTaskValidation),
  TaskController.createTask
);
router.get("/", TaskController.getAllTasks);

export const taskRouter = router;

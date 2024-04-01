import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TaskController } from "./controller.task";
import { TaskValidationSchema } from "./validation.task";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/constant.auth";

const router = express.Router();

// create task
router.post(
  "/create-task",
  validateRequest(TaskValidationSchema.createTaskValidation),
  TaskController.createTask
);
// update task
router.put(
  "/:taskId",
  validateRequest(TaskValidationSchema.updateTaskValidation),
  TaskController.updateTask
);

// delete tasks
router.delete("/tasksIds", TaskController.deleteTask);

// router.get("/", auth(USER_ROLE.user), TaskController.getAllTasks);

// get all tasks
router.get("/", TaskController.getAllTasks);

// get single tasks
router.get("/:taskId", TaskController.getSingleTask);

export const taskRouter = router;

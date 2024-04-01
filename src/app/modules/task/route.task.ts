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
  validateRequest(TaskValidationSchema.createTaskValidation),
  TaskController.createTask
);
// router.get("/", auth(USER_ROLE.user), TaskController.getAllTasks);
router.get("/", TaskController.getAllTasks);

export const taskRouter = router;

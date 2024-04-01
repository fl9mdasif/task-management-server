import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { response } from "../../utils/sendResponse";
import { TaskService } from "./service.task";
import { Task } from "./model.task";

const createTask = catchAsync(async (req, res) => {
  const result = await TaskService.createTask(req.body);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getAllTasks = catchAsync(async (req, res) => {
  const result = await TaskService.getAllTasks(req.query);
  //   console.log(result);

  // Get the total number of documents
  let total = 0;

  const page = req.query.page;
  const limit = req.query.limit;

  // show total if limit query not used
  if (!req.query) {
    const res = await Task.find();
    total = res.length;
  } else {
    total = result.length;
  }

  response.getSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: {
      page: Number(page ? page : 1),
      limit: Number(limit ? limit : 10),
      total: Number(total),
      // total: 0,
    },
    message: "Tasks retrieved successfully",
    data: result,
  });
});

// delete Task
const deleteTask = catchAsync(async (req, res) => {
  const taskIds = req.body as string[];
  console.log({ taskIds });

  const result = await TaskService.deleteTask(taskIds);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully",
    data: result,
  });
});

// Get singleTask
const getSingleTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  const result = await TaskService.getSingleTask(taskId);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task retrieved successfully",
    data: result,
  });
});

// update
const updateTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  // console.log(taskId);
  const updatedData = req.body;

  const result = await TaskService.updateTask(taskId, updatedData);
  // console.log('res', result);

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const getUserTask = catchAsync(async (req, res) => {
  const { authorId } = req.params;
  // console.log({ userId });

  const tasks = await TaskService.getUserTasks(authorId);
  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User and tasks retrieved successfully",
    data: tasks,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  deleteTask,
  getSingleTask,
  updateTask,
  getUserTask,
};

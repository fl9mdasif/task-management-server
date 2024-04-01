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

export const TaskController = {
  createTask,
  getAllTasks,
};

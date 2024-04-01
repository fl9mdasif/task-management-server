import httpStatus from "http-status";
import { TTask } from "./interface.task";
import { Task } from "./model.task";
import AppError from "../../errors/AppError";

// create user
const createTask = async (payload: TTask) => {
  const register = await Task.create(payload);
  return register;
};

// get tasks
const getAllTasks = async (payload: Record<string, unknown>) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "startDate",
      sortOrder = "asc",
      isCompleted,
      priority,
    } = payload;

    //  filter object based on query parameters
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (isCompleted)
      filter.isCompleted = { $regex: new RegExp(isCompleted as string, "i") };
    if (priority)
      filter.priority = { $regex: new RegExp(priority as string, "i") };
    const sort: Record<string, any> = {};
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;

    // calculate skip value for pagination
    const skip = (parseInt(String(page)) - 1) * parseInt(String(limit));

    const result = await Task.find(filter)
      // .populate('createdBy', '-password -createdAt -updatedAt')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(String(limit)));

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

// update
const updateTask = async (id: string, updatedData: Partial<TTask>) => {
  // console.log(id);

  // Basic update primitive fields
  const updateTaskInfo = await Task.findOneAndUpdate(
    { _id: id },

    { $set: updatedData },
    { upsert: true, new: true, runValidators: true }
  );

  if (!updateTaskInfo) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to update basic product",
      "shoe update"
    );
  }

  const result = await Task.findById({ _id: id });

  return result;
};

// getSingle task
const getSingleTask = async (id: string) => {
  const singleTask = await Task.findById({ _id: id });

  return singleTask;
};

// delete task
const deleteTask = async (ids: string[]) => {
  const deleteTask = await Task.deleteMany({ _id: { $in: ids } });
  return deleteTask;
};

export const TaskService = {
  createTask,
  getAllTasks,
  updateTask,
  getSingleTask,
  deleteTask,
};

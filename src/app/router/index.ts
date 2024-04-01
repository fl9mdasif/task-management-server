import { Router } from "express";
import { authRouter } from "../modules/auth/route.auth";
import { taskRouter } from "../modules/task/route.task";
// import { completedTaskRouter } from "../modules/completed-task/route.task";

const router = Router();

const moduleRoute = [
  {
    path: "/tasks",
    route: taskRouter,
  },
  // {
  //   path: "/completed-tasks",
  //   route: completedTaskRouter,
  // },

  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;

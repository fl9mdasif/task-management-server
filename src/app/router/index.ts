import { Router } from "express";
import { authRouter } from "../modules/auth/route.auth";
import { taskRouter } from "../modules/task/route.task";

const router = Router();

const moduleRoute = [
  {
    path: "/tasks",
    route: taskRouter,
  },

  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;

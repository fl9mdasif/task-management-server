import { Router } from "express";
import { authRouter } from "../modules/auth/route.auth";

const router = Router();

const moduleRoute = [
  {
    path: "/tasks",
    route: authRouter,
  },

  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;

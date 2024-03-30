import { Router } from "express";
import { userRoute } from "../modules/auth/route.auth";
import { courseRoute } from "../modules/course/route.course";

const router = Router();

const moduleRoute = [
  {
    path: "/courses",
    route: courseRoute,
  },

  {
    path: "/auth",
    route: userRoute,
  },
];

moduleRoute.forEach((routeObj) => router.use(routeObj.path, routeObj.route));

export default router;

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./validation.auth";
import { authControllers } from "./controller.auth";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "./constant.auth";

const router = express.Router();

// register a user
router.post(
  "/register",
  validateRequest(authValidations.userRegistrationValidation),
  authControllers.registerUser
);

// login a user
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.user),
  validateRequest(authValidations.changePasswordValidationSchema),
  authControllers.changePassword
);
export const authRouter = router;

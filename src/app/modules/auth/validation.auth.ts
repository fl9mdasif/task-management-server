import { z } from "zod";

const userRegistrationValidation = z.object({
  body: z.object({
    username: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(5),
    role: z.string().min(1),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "username is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Old password is required",
    }),
    newPassword: z.string({ required_error: "Password is required" }),
  }),
});

export const authValidations = {
  userRegistrationValidation,
  loginValidationSchema,
  changePasswordValidationSchema,
};

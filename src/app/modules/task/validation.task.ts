import { z } from "zod";

export const createTaskValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(["low", "medium", "high"]),
    deadline: z.string(),
    isCompleted: z.boolean().optional(), // Optional field
  }),
});

export const TaskValidationSchema = {
  createTaskValidation,
};

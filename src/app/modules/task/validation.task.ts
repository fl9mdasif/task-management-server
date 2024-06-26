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
export const updateTaskValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    deadline: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});

export const TaskValidationSchema = {
  createTaskValidation,
  updateTaskValidation,
};

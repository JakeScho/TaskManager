/*
    Name: taskSchema.ts
    Description: type/schema for the task popup form
*/
import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(50),
    description: z.string().max(255, "Description must be less than 255 characters").optional(),
    due_date: z.string().optional(),
    status: z.string().optional(),
});

export type TaskFormType = z.infer<typeof TaskSchema>;

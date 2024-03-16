import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters"),
});
export const studentLoginSchema = z.object({
  rollNumber: z.string().min(1, "Minimum 1 characters"),
  studentName: z.string().min(3, "Minimum 3 characters"),
});

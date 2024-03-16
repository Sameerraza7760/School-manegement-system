import { z } from "zod";
export const adminSchema = z.object({
  userName: z.string().min(3, "User Name is required").max(50),
  schoolName: z.string().min(3, "School Name is required").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters"),
});

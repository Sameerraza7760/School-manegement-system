import { object, string } from "zod";
export const adminSchema = object({
  userName: string().min(3, "User Name is required").max(50),
  schoolName: string().min(3, "School Name is required").max(50),
  email: string().email("Invalid email address"),
  password: string().min(6, "Minimum 6 characters"),
});

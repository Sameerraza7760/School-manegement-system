import {  object, string } from "zod";
export const loginSchema = object({
  email: string().email("Invalid email address"),
  password: string().min(6, "Minimum 6 characters"),
});
export const studentLoginSchema = object({
  rollNumber: string().min(1, "Minimum 1 characters"),
  studentName: string().min(3, "Minimum 3 characters"),
});

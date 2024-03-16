import { object, string } from "zod";
export const teacherInfoSchema = object({
  teacherName: string().min(1, "Teacher Name is required"),
  email: string().email(),
  password: string().min(6),
  phoneNumber: string().min(11, "Enter Correct Phone Number"),
});

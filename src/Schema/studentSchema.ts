import {  object, string } from "zod";

export const StudentSchema = object({
  studentName: string().min(1).max(255),
  studentRollNum: string().min(1, "RollNum is Required").max(50),
  studentClass: string().min(1, "ClassName is required").max(255),
});

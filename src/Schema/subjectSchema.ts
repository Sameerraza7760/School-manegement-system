import {  object, string } from "zod";

export const subjectSchema = object({
  subjectName: string().min(1, "Subject name is required").max(255),
});

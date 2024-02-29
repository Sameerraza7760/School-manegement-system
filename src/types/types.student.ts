import { Attendance } from "./type.attendence";
export interface StudentDetail {
  studentName: string;
  studentRollNum: number;
  studentClass: number;
  studentid?: string;
  schoolId: string;
  attendance?: Attendance[];
}
export interface StudentResult {
  studentName: string;
  RollNumber: string;
  quizResult: number;
  classId: string;
  isStdCompleted?: boolean;
  quizId?: string;
  studentId: string;
}

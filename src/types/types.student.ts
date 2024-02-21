export interface StudentDetail {
  studentName: string;
  studentRollNum: number;
  studentClass: number;
  studentid?: string;
  schoolId: string;
}
export interface StudentResult {
  studentName: string;
  RollNumber: string;
  quizResult: number;
  classId: string;
}
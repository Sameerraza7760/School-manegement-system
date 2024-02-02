export interface StudentDetail {
  studentName: string;
  studentRollNum: number;
  studentClass: number;
  studentid?: string;
  schoolId: string;
}
export interface StudentAttendance {
  date: string; // Assuming 'date' is a string in ISO format
  id: string;
  status: string;
}

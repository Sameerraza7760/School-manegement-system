export interface Assignment {
  title: string;
  description: string;
  dueDate: string;
  classId: string | undefined;
  assignmentId?: string;
}

export interface completeAssignment {
  studentName: string;
  studentRollNum: number;
  studentClass: number;
  studentAssinment: string | undefined;
  submissionText: string;
  assignmentId: string | null;
  studentId: string | undefined;
}

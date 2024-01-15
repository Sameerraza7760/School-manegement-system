export enum UserRole {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
}


export interface AdminCredentials {
  username: string;
  schoolName?: string;
  email: string;
  password: string;
  role: UserRole.Admin;
  schoolid:string,
}

export interface TeacherCredentials {
  username: string;
  password: string;
  email: string;
  role: UserRole.Teacher;
}

export interface StudentCredentials {
  username: string;
  password: string;
  rollNumber: string;
  role: UserRole.Student;
}

export type UserCredentials =
  | StudentCredentials
  | TeacherCredentials
  | AdminCredentials
  
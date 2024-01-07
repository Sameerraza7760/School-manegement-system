import { Timestamp } from "firebase/firestore";

export interface typeClass {
  classId: string;
  className: number;
  students?: string[];
  teachers?: string[];
  subjects?: string[];

  timestamp: Timestamp;
}

import { Student } from "./types.stundent";

export interface ClassRoom {
  id: string;
  className: number;
  students?: Student[];
  teachers?: string[];
  subjects?: string[];
  timestamp: any;
  role?: string;
}

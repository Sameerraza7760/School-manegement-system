export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  questions: Question[];
  timeLimit: number;
}

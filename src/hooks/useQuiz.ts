import { addDoc, collection } from "firebase/firestore";
import { Question } from "../types/type.quiz";
import { db } from "../db/firebase";
import { toast } from "react-toastify";

const useQuiz = () => {
  const submitQuizTest = async (quizTitle: string, questions: Question[]) => {
    try {
      const quizzesCollection = collection(db, "Quizzes");
      const docRef = await addDoc(quizzesCollection, {
        quizTitle,
        questions,
      });
      toast.success("Quiz submitted");
    } catch (error:any) {
      toast.warn(error.message);
    }
  };

  return { submitQuizTest };
};

export default useQuiz;

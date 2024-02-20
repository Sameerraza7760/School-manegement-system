import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../db/firebase";
import { Question } from "../types/type.quiz";

const useQuiz = () => {
  const submitQuizTest = async (
    quizTitle: string,
    questions: Question[],
    classId: string
  ) => {
    try {
      const quizzesCollection = collection(db, "Quizzes");
      const docRef = await addDoc(quizzesCollection, {
        quizTitle,
        questions,
        classId,
        createdAt: serverTimestamp(),
      });
      toast.success("Quiz submitted");
    } catch (error: any) {
      toast.warn(error.message);
    }
  };
  const getQuizzesByClassId = async (
    classId: string | undefined
  ): Promise<any[]> => {
    try {
      const quizzesCollection = collection(db, "Quizzes");
      const querySnapshot = await getDocs(
        query(quizzesCollection, where("classId", "==", classId))
      );

      if (querySnapshot.empty) {
        console.log("No quizzes found for classId:", classId);
        return [];
      }

      const quizData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Question[]),
      }));

      return quizData;
    } catch (error: any) {
      toast.warn(error.message);
      return [];
    }
  };
  const getQuizById = async (id: string) => {
    try {
      const quizDocRef = doc(db, "Quizzes", id);
      const quizDocSnapshot = await getDoc(quizDocRef);

      if (quizDocSnapshot.exists()) {
        const quizData = quizDocSnapshot.data();
        return quizData;
      } else {
        console.log("Quiz not found");
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching quiz:", error.message);
      return null;
    }
  };

  return { submitQuizTest, getQuizzesByClassId, getQuizById };
};

export default useQuiz;

import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../db/firebase";
import { Question } from "../types/type.quiz";
import { StudentResult } from "../types/types.student";

const useQuiz = () => {
  const submitQuizTest = async (
    quizTitle: string,
    questions: Question[],
    classId: string,
    timeLimit: number
  ) => {
    try {
      const quizzesCollection = collection(db, "Quizzes");
      await addDoc(quizzesCollection, {
        quizTitle,
        timeLimit,
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
  ): Promise<DocumentData[]> => {
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
  const getQuizById = async (id: string): Promise<Question | null> => {
    try {
      const quizDocRef = doc(db, "Quizzes", id);
      const quizDocSnapshot = await getDoc(quizDocRef);

      if (quizDocSnapshot.exists()) {
        const quizData = quizDocSnapshot.data() as Question;
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

  const addResultofQuiz = async (stdData: StudentResult) => {
    try {
      const resultDocRef = doc(db, "results", stdData.RollNumber);
      await setDoc(resultDocRef, stdData);
      if (stdData.quizId) {
        await markQuizAsCompletedForStudent(stdData.quizId, stdData.studentId);
      }
    } catch (error) {
      console.error("Error adding quiz result:", error);
    }
  };

  const getResultsOfStd = async (classId: string): Promise<StudentResult[]> => {
    try {
      const resultsQuery = query(
        collection(db, "results"),
        where("classId", "==", classId)
      );

      const results: StudentResult[] = [];
      const resultsSnapshot = await getDocs(resultsQuery);

      resultsSnapshot.forEach((doc) => {
        results.push({ ...(doc.data() as StudentResult), RollNumber: doc.id });
      });

      return results;
    } catch (error) {
      console.error("Error fetching results by classId:", error);

      throw new Error("Failed to fetch results by classId");
    }
  };

  const markQuizAsCompletedForStudent = async (
    quizId: string,
    studentId: string
  ) => {
    try {
      const completedQuizzesDocRef = doc(
        db,
        "completedQuizzes",
        `${quizId}_${studentId}`
      );
      await setDoc(completedQuizzesDocRef, { completed: true });
      console.log(
        `Quiz ${quizId} marked as completed for student ${studentId}`
      );
    } catch (error: any) {
      console.error("Error marking quiz as completed:", error.message);
      throw new Error("Failed to mark quiz as completed");
    }
  };

  const checkIfQuizCompletedForStudent = async (
    quizId: string,
    studentId: string | undefined
  ): Promise<boolean> => {
    try {
      const completedQuizzesDocRef = doc(
        db,
        "completedQuizzes",
        `${quizId}_${studentId}`
      );
      const completedQuizzesDocSnapshot = await getDoc(completedQuizzesDocRef);
      if (completedQuizzesDocSnapshot.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error("Error checking quiz completion status:", error.message);
      throw new Error("Failed to check quiz completion status");
    }
  };

  
  return {
    submitQuizTest,
    getQuizzesByClassId,
    getQuizById,
    addResultofQuiz,
    getResultsOfStd,
    checkIfQuizCompletedForStudent,
  };
};

export default useQuiz;

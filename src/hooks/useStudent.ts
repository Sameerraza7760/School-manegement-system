import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enrollStudent } from "../Config/store/slice/StudentSlice";
import { db } from "../db/firebase";
import { StudentDetail } from "../types/types.student";

const useStudent = () => {
  const dispatch = useDispatch();
  const addStudentDetail = async (
    studentData: StudentDetail,
    classroomId: string
  ): Promise<void> => {
    try {
      return setDoc(doc(db, "students", classroomId + Date.now()), studentData);
    } catch (error: any) {
      console.error("Error adding document:", error.message);
    }
  };

  const getAllStudentsInClassroom = async (): Promise<StudentDetail[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students: StudentDetail[] = [];

      querySnapshot.forEach((doc) => {
        students.push({
          studentid: doc.id,
          ...doc.data(),
        } as StudentDetail);
      });
      dispatch(enrollStudent(students));
      return students;
    } catch (error: any) {
      console.error("Error getting students in classroom:", error.message);
      return [];
    }
  };

  return {
    addStudentDetail,
    getAllStudentsInClassroom,
  };
};

export default useStudent;

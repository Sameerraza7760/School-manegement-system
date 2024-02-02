import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enrollStudent } from "../Config/store/slice/StudentSlice";
import { db } from "../db/firebase";
import { StudentAttendance, StudentDetail } from "../types/types.student";

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

  const takeStudentAttendance = async (
    studentAttendance: StudentAttendance
  ) => {
    try {
      const { id } = studentAttendance;
      const studentsCollection = collection(db, "students");
      const studentDoc = doc(studentsCollection, id);

      await setDoc(
        studentDoc,
        { attendance: arrayUnion(studentAttendance) },
        { merge: true }
      );

      console.log("Attendance recorded:", studentAttendance);
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  return {
    addStudentDetail,
    getAllStudentsInClassroom,
    takeStudentAttendance,
  };
};

export default useStudent;

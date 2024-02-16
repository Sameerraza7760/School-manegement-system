import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enrollStudent } from "../Config/store/slice/StudentSlice";
import { db } from "../db/firebase";
import { StudentDetail } from "../types/types.student";
import { Attendance } from "../types/type.attendence";
import { Complain } from "../types/type.complain";

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

  const takeStudentAttendance = async (studentAttendance: Attendance) => {
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
  const submitComplain = async (complain: any) => {
    try {
      const docRef = await addDoc(collection(db, "Complain"), complain);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const getComplaints = async () => {
    try {
      // Querying all documents from the "students" collection
      const querySnapshot = await getDocs(collection(db, "Complain"));

      // Extracting data from the query snapshot
      const complaints = querySnapshot.docs.map((doc) => doc.data());

      console.log("Complaints:", complaints);
      return complaints as Complain[];
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  };

  // Example usage

  return {
    addStudentDetail,
    getAllStudentsInClassroom,
    takeStudentAttendance,
    submitComplain,
    getComplaints,
  };
};

export default useStudent;

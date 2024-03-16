import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setStudent } from "../Config/store/slice/CurrentStudentSlice";
import { enrollStudent } from "../Config/store/slice/StudentSlice";
import { db } from "../db/firebase";
import { Attendance } from "../types/type.attendence";
import { StudentDetail } from "../types/types.student";
const useStudent = () => {
  const enrolledStudents: StudentDetail[] = useSelector(
    (state?: any) => state.students.enrolledStudents
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addStudentDetail = async (
    studentData: StudentDetail,
    classroomId: string
  ): Promise<void> => {
    try {
      const { studentRollNum } = studentData;
      const students = await getAllStudentsInClassroom();
      const isRollNumberSame = students.find(
        (std) => std.studentRollNum === studentRollNum
      );
      if (isRollNumberSame) {
        toast.warn("This rollnumber is already exist");
        return;
      }
      await setDoc(doc(db, "students", classroomId + Date.now()), studentData);
      toast.success("Student Add");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
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

  const handleStudentLogin = (rollNum: number, studentName: string) => {
    const findStudent = enrolledStudents.find(
      (std) => std.studentName === studentName && std.studentRollNum === rollNum
    );
    if (!findStudent) {
      toast.warn("Wrong Name or Rollnumber");
      return;
    }
    dispatch(setStudent(findStudent));
    toast.success("Signin Succsesffuly");
    setTimeout(() => {
      navigate("/StudentDashboard");
    }, 2000);
  };

  // Example usage

  return {
    addStudentDetail,
    getAllStudentsInClassroom,
    takeStudentAttendance,

    handleStudentLogin,
  };
};

export default useStudent;

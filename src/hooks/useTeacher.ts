import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../db/firebase";
import { TeacherInfo } from "../types/types.teacher";
import { enrolledTeachers } from "../Config/store/slice/TeachersSlice";
import { useDispatch } from "react-redux";
import { Attendance } from "../types/type.attendence";
import { useNavigate } from "react-router-dom";
const useTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addTeacherInDB = async (teacherInfo: TeacherInfo) => {
    const { email, password } = teacherInfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addTeacherintoDb(teacherInfo, userCredential.user.uid);
      return userCredential;
    } catch (e: any) {
      console.log(e);
    }
  };

  const takeTeacherAttendence = async (teacherAttendance: Attendance) => {
    try {
      const { id } = teacherAttendance;
      const teachersCollection = collection(db, "Teachers");
      const teacherDoc = doc(teachersCollection, id);

      await setDoc(
        teacherDoc,
        { attendance: arrayUnion(teacherAttendance) },
        { merge: true }
      );

      console.log("Attendance recorded:", teacherAttendance);
    } catch (error) {
      console.error("Error recording attendance:", error);
    }
  };

  // ADD teacher IN DATABASE
  const addTeacherintoDb = async (
    teacherInfo: TeacherInfo,
    teacherId: string
  ) => {
    const {
      email,
      phoneNumber,
      classId,
      teacherName,
      selectedSubject,
      ClassName,
    } = teacherInfo;

    const teacherData = {
      email,
      phoneNumber,
      classId,
      teacherName,
      selectedSubject,
      ClassName,
      teacherId,
    };

    await setDoc(doc(db, "Teachers", teacherId), teacherData);

    setTimeout(() => {
      navigate("/TeacherDashboard");
    }, 2000);
  };

  const getAllTeacher = async (): Promise<TeacherInfo[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "Teachers"));
      const teachers: TeacherInfo[] = [];

      querySnapshot.forEach((doc) => {
        teachers.push({
          classId: doc.id,
          ...doc.data(),
        } as TeacherInfo);
      });
      dispatch(enrolledTeachers(teachers));

      return teachers;
    } catch (error: any) {
      console.error("Error getting teachers in classroom:", error.message);
      return [];
    }
  };
  const getTeachersByClassId = async (
    classId: string
  ): Promise<TeacherInfo[]> => {
    try {
      const q = query(
        collection(db, "Teachers"),
        where("classId", "==", classId)
      );

      const querySnapshot = await getDocs(q);
      const teachers: TeacherInfo[] = [];

      querySnapshot.forEach((doc) => {
        teachers.push({
          ...doc.data(),
        } as TeacherInfo);
      });

      dispatch(enrolledTeachers(teachers));

      return teachers;
    } catch (error: any) {
      console.error("Error getting teachers in classroom:", error.message);
      return [];
    }
  };
  return {
    addTeacherInDB,
    getAllTeacher,
    getTeachersByClassId,
    takeTeacherAttendence,
  };
};

export default useTeacher;

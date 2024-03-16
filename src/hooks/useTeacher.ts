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
import { enrolledTeachers as enrolledTeacher } from "../Config/store/slice/TeachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTeacher } from "../Config/store/slice/CurrentTeacherSlice";
import { auth, db } from "../db/firebase";
import { Attendance } from "../types/type.attendence";
import { User } from "../types/types.auth";
import { TeacherInfo } from "../types/types.teacher";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
const useTeacher = () => {
  const { signin } = useAuth();
  const { enrolledTeachers } = useSelector((state: any) => state.teachers);
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
      toast.success("teacher Add");
      setTimeout(() => {
        navigate("/classAdd");
      }, 2000);
      return userCredential;
    } catch (e: any) {
      toast.warning(e.message);
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
    const teacherData = {
      ...teacherInfo,
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
      dispatch(enrolledTeacher(teachers));

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

      dispatch(enrolledTeacher(teachers));

      return teachers;
    } catch (error: any) {
      console.error("Error getting teachers in classroom:", error.message);
      return [];
    }
  };
  const handleTeacherLogin = async (data: User) => {
    const { email } = data;
    const isTeacher = enrolledTeachers?.find(
      (item: TeacherInfo) => item.email === email
    );
    if (isTeacher) {
      const Role = "Teacher";
      await signin(data, Role);
      dispatch(setTeacher(isTeacher));
      return;
    } else {
      // Handle the case where the user is not a teacher
      toast.warning("Invalid Teacher credentials");
    }
  };
  return {
    addTeacherInDB,
    getAllTeacher,
    getTeachersByClassId,
    takeTeacherAttendence,
    handleTeacherLogin,
  };
};

export default useTeacher;

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../db/firebase";
import { TeacherInfo } from "../types/types.teacher";

const useTeacher = () => {
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
      // Handle error
      console.log(e);
      console.log(e);
    }
  };

  // ADD teacher IN DATABASE
  const addTeacherintoDb = async (teacherInfo: TeacherInfo, uid: string) => {
    let { email, phoneNumber, className, subject, teacherName } = teacherInfo;
    let teacherData = { email, phoneNumber, className, subject, teacherName };
    return setDoc(doc(db, "Teachers", uid), teacherData);
  };

  const getAllTeacher = async (): Promise<TeacherInfo[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const teachers: TeacherInfo[] = [];

      querySnapshot.forEach((doc) => {
        teachers.push({
          classId: doc.id,
          ...doc.data(),
        } as TeacherInfo);
      });
      // dispatch(enrollStudent(students));
      return teachers;
    } catch (error: any) {
      console.error("Error getting teachers in classroom:", error.message);
      return [];
    }
  };
  return {
    addTeacherInDB,
    getAllTeacher
  };
};

export default useTeacher;

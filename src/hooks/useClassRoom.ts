import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setClass } from "../Config/store/slice/ClassSlice";
import { db } from "../db/firebase";
import { ClassRoom } from "../types/types.class";
const useClassRoom = () => {
  const dispatch = useDispatch();
  const addClassToDb = async (className: string, schoolid: string) => {
    try {
      const docRef = await addDoc(collection(db, "classes"), {
        timestamp: serverTimestamp(),
        className,
        schoolid,
      });
      await updateDoc(docRef, { id: docRef.id });
    } catch (error) {
      console.log(error);
    }
  };

  const getClassesFromDb = async (): Promise<ClassRoom[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classes: ClassRoom[] = [];
      querySnapshot.forEach((doc) => {
        classes.push({ ...(doc.data() as ClassRoom) });
      });
      dispatch(setClass(classes));
      return classes;
    } catch (error: any) {
      console.log("Error retrieving classes from the database");
      return [];
    }
  };

  const deleteClassFromDb = async (id: string) => {
    try {
      const classDocRef = doc(db, "classes", id);
      await deleteDoc(classDocRef);
      console.log("Class deleted from the database with ID:", id);
    } catch (error: any) {
      console.error("Error deleting class from the database:", error.message);
    }
  };

  const getClassDetailById = async (id: string): Promise<ClassRoom | null> => {
    try {
      const classDocRef = doc(db, "classes", id);
      const classSnapshot = await getDoc(classDocRef);
      if (classSnapshot.exists()) {
        const classData = classSnapshot.data() as ClassRoom;
        console.log("Class details:", classData);

        return classData;
      } else {
        console.log("Class not found");
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching class details:", error.message);
      throw error;
    }
  };

  return {
    addClassToDb,
    getClassesFromDb,
    deleteClassFromDb,
    getClassDetailById,
  };
};

export default useClassRoom;

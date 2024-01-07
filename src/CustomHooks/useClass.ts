import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Config/firebase/firebase";
import { typeClass } from "../types/types.class";

const useClass = () => {
  const addClassinDb = async (newClassName: string) => {
    try {
      const classesCollection = collection(db, "classes");
      const docRef = await addDoc(classesCollection, {
        className: newClassName,
        timestamp: serverTimestamp(),
      });
      await updateDoc(docRef, { classId: docRef.id });
      console.log("Class added to the database successfully!");
    } catch (error: any) {
      console.error("Error adding class to the database:", error.message);
    }
  };
  const getClassesFromDb = async (): Promise<Array<string>> => {
    try {
      const classesCollection = collection(db, "classes");
      const querySnapshot = await getDocs(classesCollection);
      const classes: any[] = [];
      querySnapshot.forEach((doc) => {
        const className = doc.data();
        classes.push(className);
      });

      console.log("Classes retrieved from the database:", classes);
      return classes;
    } catch (error: any) {
      console.error(
        "Error retrieving classes from the database:",
        error.message
      );
      return [];
    }
  };

  const deleteClassFromDb = async (classId: string) => {
    try {
      const classDocRef = doc(db, "classes", classId);
      await deleteDoc(classDocRef);
      console.log("Class deleted from the database with ID:", classId);
    } catch (error: any) {
      console.error("Error deleting class from the database:", error.message);
    }
  };

  const getClassDetailByUid = async (
    classId: string
  ): Promise<typeClass | null> => {
    try {
      const classDocRef = doc(db, "classes", classId);
      const classSnapshot = await getDoc(classDocRef);

      if (classSnapshot.exists()) {
        const classData = classSnapshot.data() as typeClass;
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
    addClassinDb,
    getClassesFromDb,
    deleteClassFromDb,
    getClassDetailByUid,
  };
};

export default useClass;

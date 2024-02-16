import { message } from "antd";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";

const useSubject = () => {
  const addSubjectinClass = async (classId: string, subject: string) => {
    try {
      const classDocRef = doc(collection(db, "classes"), classId);

      await updateDoc(classDocRef, {
        subjects: arrayUnion(subject),
      });

      message.success("Subject added successfully!");

      console.log("Subject added successfully");
    } catch (error: any) {
      console.error("Error updating subjects:", error);
      message.error(error);
    }
  };

  return {
    addSubjectinClass,
  };
};

export default useSubject;

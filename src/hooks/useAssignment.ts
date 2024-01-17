import { useDispatch } from "react-redux";
import { Assignment } from "../types/types.assignment";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

const useAssignment = () => {
  const dispatch = useDispatch();
  const addAssignmentInClass = async (assignment: Assignment) => {
    const { classId } = assignment;

    try {
      if (classId) {
        await setDoc(doc(db, "Assignment", classId), assignment);
        console.log("Assignment added successfully!");
        return;
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const getAssignmentByClassId = async (classId:string) => {
    try {
      const assignmentDoc = await getDoc(doc(db, "Assignment", classId));
  
      if (assignmentDoc.exists()) {
        // Assignment exists, you can access its data
        const assignmentData = assignmentDoc.data();
        console.log("Assignment retrieved successfully:", assignmentData);
        return assignmentData as Assignment ;
      } else {
        console.log("Assignment does not exist for classId:", classId);
        return null;
      }
    } catch (error) {
      console.error("Error getting assignment:", error);
      return null;
    }
  };
  return {
    addAssignmentInClass,
    getAssignmentByClassId
  };
};

export default useAssignment;

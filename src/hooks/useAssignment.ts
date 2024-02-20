import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { Assignment, completeAssignment } from "../types/types.assignment";

const useAssignment = () => {
  const addAssignmentInClass = async (assignment: Assignment) => {
    const { classId } = assignment;
    try {
      if (classId) {
        const docRef = await addDoc(collection(db, "Assignment"), assignment);
        await updateDoc(docRef, { assignmentId: docRef.id });
        console.log("Assignment added successfully!");
        return;
      }
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const submitAssignment = async (assignmentContent: completeAssignment) => {
    try {
      await addDoc(collection(db, "completeAssignments"), assignmentContent);
      console.log("Assignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  const getCompleteAssignments = async (assignmentId: string) => {
    try {
      const completeAssignmentsRef = collection(db, "completeAssignments");
      const q = query(
        completeAssignmentsRef,
        where("assignmentId", "==", assignmentId)
      );
      const querySnapshot = await getDocs(q);
      const completedAssignments = querySnapshot.docs.map(
        (doc) => doc.data() as completeAssignment
      );
      return completedAssignments;
    } catch (error) {
      console.error("Error getting completed assignments:", error);
      return [];
    }
  };
  const getAssignmentByClassId = async (classId: string | "") => {
    try {
      const q = query(
        collection(db, "Assignment"),
        where("classId", "==", classId)
      );
      const querySnapshot = await getDocs(q);
      const assignments: Assignment[] = [];
      querySnapshot.forEach((doc) => {
        assignments.push(doc.data() as Assignment);
      });

      if (assignments.length > 0) {
        console.log("Assignments retrieved successfully:", assignments);
        return assignments;
      } else {
        console.log("No assignments found for classId:", classId);
        return null;
      }
    } catch (error) {
      console.error("Error getting assignments:", error);
      return null;
    }
  };
  return {
    addAssignmentInClass,
    getAssignmentByClassId,
    submitAssignment,

    getCompleteAssignments,
  };
};

export default useAssignment;

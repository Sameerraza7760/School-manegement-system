import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../db/firebase";
import { Complain } from "../types/type.complain";

export const useComplain = () => {
  const submitComplain = async (complain: any) => {
    try {
      const docRef = await addDoc(collection(db, "Complain"), complain);
      toast.success("Complain Submited");
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  };

  const getComplaints = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Complain"));
      const complaints = querySnapshot.docs.map((doc) => doc.data());
      console.log("Complaints:", complaints);
      return complaints as Complain[];
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  };
  return { submitComplain, getComplaints };
};

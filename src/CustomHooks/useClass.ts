import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../Config/firebase/firebase";
import { typeAuth } from "../types/types.auth";

const useClass = () => {
  const addClassinDb = async (newClassName: string) => {
    try {
      const classesCollection = collection(db, "classes");
      await addDoc(classesCollection, { className: newClassName });
      console.log("Class added to the database successfully!");
    } catch (error: any) {
      console.error("Error adding class to the database:", error.message);
    }
  };

  return {
    addClassinDb,
  };
};

export default useClass;

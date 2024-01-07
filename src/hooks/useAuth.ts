import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {auth,db} from './../db/firebase'
import { typeAuth } from "../types/types.auth";

const useAuth = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // SIGNUP USER
  const signup = async (userinfo: typeAuth) => {
    const { email, password } = userinfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addAdminToDb(userinfo, userCredential.user.uid);
      setSuccessMessage("Registered successfully");
      return userCredential;
    } catch (e: any) {
      setError(e.message);
    }
  };

  // ADD USER IN DATABASE
  const addAdminToDb = async (userProfile: typeAuth, uid: string) => {
    let { email, adminName, schoolName } = userProfile;
    let adminData = { schoolName, email, adminName, uid };
    return setDoc(doc(db, "Admin", uid), adminData);
  };

  // SIGNIN THE USER
  const signin = async (userinfo: typeAuth) => {
    try {
      const { email, password } = userinfo;
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Signin Succsessfully");
    } catch (e: any) {
      setError(e.message);
    }
  };

  // LOGOUT THE CURRENT USER
  async function logout() {
    try {
      await auth.signOut();
      setSuccessMessage("Logout");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return {
    signup,
    logout,
    signin,
    successMessage,
    error,
  };
};

export default useAuth;

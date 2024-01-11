import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminCredentials } from "../types/types.auth";
import { auth, db } from "./../db/firebase";
import { signupAdmin } from "../Config/store/slice/AuthSlice";
// import { setAuth,Logout } from "../Config/store/slice/AuthSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // SIGNUP USER
  const signup = async (userinfo: AdminCredentials) => {
    const { email, password } = userinfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addAdminToDb(userinfo, userCredential.user.uid);
      dispatch(signupAdmin(userinfo));

      setSuccessMessage("Registered successfully");
      return userCredential;
    } catch (e: any) {
      setError(e.message);
    }
  };

  // ADD USER IN DATABASE
  const addAdminToDb = async (userProfile: AdminCredentials, uid: string) => {
    let { email, username, schoolName } = userProfile;
    let adminData = { schoolName, email, username, uid };
    return setDoc(doc(db, "Admin", uid), adminData);
  };

  // const getAdminByid = async (uid: string) => {
  //   try {
  //     const adminDoc = await getDoc(doc(db, "Admin", uid));

  //     if (adminDoc.exists()) {
  //       const adminData = adminDoc.data() as AdminCredentials;
  //       // dispatch(setAuth(adminData));
  //       return adminData;
  //     } else {
  //       console.log("Admin not found");
  //       return null;
  //     }
  //   } catch (error: any) {
  //     console.error("Error getting admin by UID:", error.message);
  //     return null;
  //   }
  // };

  // // Example usage:
  // const uid = "your_admin_uid";
  // const adminData = await getAdminByUid(uid);

  // // Check if adminData is not null before using it
  // if (adminData) {
  //   // Use adminData as needed
  //   console.log("Admin Data:", adminData);
  // }

  // SIGNIN THE USER
  const signin = async (userinfo: AdminCredentials) => {
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
      // dispatch(Logout());
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
    // getAdminByid,
  };
};

export default useAuth;

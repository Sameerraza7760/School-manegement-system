import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AdminCredentials } from "../types/types.auth";
import { auth, db } from "./../db/firebase";
import { setAdmin } from "../Config/store/slice/CurrentAdmin";
import { notics } from "../types/type.notics";

const useAuth = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signup = async (userinfo: AdminCredentials) => {
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
  const addAdminToDb = async (
    userProfile: AdminCredentials,
    schoolid: string
  ) => {
    let { email, username, schoolName, role } = userProfile;
    let adminData = { schoolName, email, username, schoolid, role };
    return setDoc(doc(db, "Admin", schoolid), adminData);
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const schoolid = userCredential.user.uid;
      const adminData = await fetchAdminDataFromDatabase(schoolid);
      const loggedInAdmin: AdminCredentials = {
        email: userCredential.user.email,
        ...adminData,
      };
      console.log(loggedInAdmin);
      dispatch(setAdmin(loggedInAdmin));
      setSuccessMessage("Signin Succsessfully");
    } catch (e: any) {
      setError(e.message);
    }
  };

  // LOGOUT  CURRENT USER
  async function logout() {
    try {
      await auth.signOut();
      setSuccessMessage("Logout");
      // dispatch(Logout());
    } catch (e: any) {
      setError(e.message);
    }
  }

  const fetchAdminDataFromDatabase = async (id: string) => {
    try {
      const adminDocRef = doc(db, "Admin", id);
      const adminSnapShot = await getDoc(adminDocRef);
      if (adminSnapShot.exists()) {
        const adminData = adminSnapShot.data() as AdminCredentials;
        console.log("admin details:", adminData);

        return adminData;
      } else {
        console.log("admin not found");
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching admin details:", error.message);
      throw error;
    }
  };

  const addNoticeinDb = async (notice: notics) => {
    const { schoolid, noticeContent } = notice;

    try {
      setDoc(doc(db, "notics", schoolid), {
        content: noticeContent,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding notice to the database:", error);
    }
  };

  const getNoticeFromDb = async (schoolid: string) => {
    try {
      const noticeDocRef = doc(db, "notics", schoolid);
      const noticeSnapshot = await getDoc(noticeDocRef);

      if (noticeSnapshot.exists()) {
        return noticeSnapshot.data() as notics;
      } else {
        console.log("Notice not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting notice from the database:", error);
      return null;
    }
  };

  return {
    signup,
    logout,
    signin,
    successMessage,
    error,
    addNoticeinDb,
    getNoticeFromDb,
  };
};

export default useAuth;

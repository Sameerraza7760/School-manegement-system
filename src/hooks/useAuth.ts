import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "../Config/store/slice/CurrentAdmin";
import { notics } from "../types/type.notics";
import { AdminCredentials, updateAdminCred } from "../types/types.auth";
import { auth, db } from "./../db/firebase";
import { message } from "antd";
import { removeTeacher } from "../Config/store/slice/CurrentTeacherSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeStudent } from "../Config/store/slice/CurrentStudentSlice";
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      await fetchAdminDataFromDatabase(schoolid);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const fetchAdminDataFromDatabase = async (id: string) => {
    try {
      const adminDocRef = doc(db, "Admin", id);
      const adminSnapShot = await getDoc(adminDocRef);
      if (adminSnapShot.exists()) {
        const adminData = adminSnapShot.data() as AdminCredentials;
        console.log("admin details:", adminData);
        dispatch(setAdmin(adminData));
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
        noticeContent: noticeContent,
        timestamp: serverTimestamp(),
        schoolid: schoolid,
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

  const updateProfile = async (profile: updateAdminCred, id: string) => {
    const userDocRef = doc(collection(db, "Admin"), id);
    const updatedFields: any = {};
    if (profile.username) updatedFields.username = profile.username;
    if (profile.phoneNumber) updatedFields.phoneNumber = profile.phoneNumber;
    if (profile.image) updatedFields.image = profile.image;
    await updateDoc(userDocRef, updatedFields);
    message.success("Profile Update successfully!");

    console.log("User updated successfully");
    try {
    } catch (error) {}
  };

  const handleLogout = async () => {
    await auth.signOut();
    toast.warning("Logout");
    setTimeout(() => {
      dispatch(removeTeacher());
      dispatch(removeStudent());
      navigate("/chooseUser");
    }, 2000);
  };

  return {
    signup,

    signin,

    error,
    addNoticeinDb,
    getNoticeFromDb,
    updateProfile,
    fetchAdminDataFromDatabase,
    handleLogout,
    addAdminToDb,
  };
};

export default useAuth;

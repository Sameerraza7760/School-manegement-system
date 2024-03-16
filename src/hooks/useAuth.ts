import { message } from "antd";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAdmin } from "../Config/store/slice/CurrentAdmin";
import { removeStudent } from "../Config/store/slice/CurrentStudentSlice";
import { removeTeacher } from "../Config/store/slice/CurrentTeacherSlice";
import { notics } from "../types/type.notics";
import { AdminCredentials, updateAdminCred } from "../types/types.auth";
import { auth, db } from "./../db/firebase";
import { User } from "./../types/types.auth";
const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (userinfo: AdminCredentials) => {
    const { email, password } = userinfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addAdminToDb(userinfo, userCredential.user.uid);
      toast.success("Regestered Sucsessfully");
      setTimeout(() => {
        navigate(`/login/${"Admin"}`);
      }, 2000);
      return userCredential;
    } catch (e: any) {
      toast.warning(e.message);
    }
  };

  // ADD USER IN DATABASE
  const addAdminToDb = async (
    userProfile: AdminCredentials,
    schoolid: string
  ) => {
    let { email, userName, schoolName, role } = userProfile;
    let adminData = { schoolName, email, userName, schoolid, role };
    return setDoc(doc(db, "Admin", schoolid), adminData);
  };

  // SIGNIN  USER
  const signin = async (userinfo: User, Role: string) => {
    try {
      const { email, password } = userinfo;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success(`Signin ${Role}`);
      if (Role === "Admin") {
        const schoolid = userCredential.user.uid;
        await fetchAdminDataFromDatabase(schoolid);

        setTimeout(() => {
          navigate("/adminHome");
        }, 2000);
        return;
      }
      setTimeout(() => {
        navigate("/TeacherDashboard");
      }, 2000);
    } catch (e: any) {
      toast.warning(e.message);
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

    console.log("Profile updated successfully");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    toast.success("Logout");
    setTimeout(() => {
      dispatch(removeTeacher());
      dispatch(removeStudent());
      navigate("/chooseUser");
    }, 2000);
  };

  return {
    signup,
    signin,
    addNoticeinDb,
    getNoticeFromDb,
    updateProfile,
    fetchAdminDataFromDatabase,
    handleLogout,
    addAdminToDb,
  };
};

export default useAuth;

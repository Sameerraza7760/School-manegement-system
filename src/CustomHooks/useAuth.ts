import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { typeAuth } from "../types/types.auth";
import { auth, db } from "../Config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

const useAuth = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //SIGNUP USER
  const signup = async (userinfo: typeAuth) => {
    const { email, password } = userinfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addUserToDB(userinfo, userCredential.user.uid);
      console.log("Registered successfully");

      setSuccessMessage("Registered successfully");
      return userCredential;
    } catch (e: any) {
      setError(e.message);
    }
  };

  //ADD USER IN DATABASE
  const addUserToDB = async (userProfile: typeAuth, uid: string) => {
    let { email, adminName, schoolName } = userProfile;
    let adminData = { schoolName, email, adminName, uid };
    return setDoc(doc(db, "Admin", uid), adminData);
  };

  //SIGININ THE USER
  const signin = async (userinfo: typeAuth) => {
    try {
      const { email, password } = userinfo;
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Loggedin");

      // setSuccessMessage("Loggedin");
    } catch (e: any) {
      setError(e.message);
    }
  };

  //LOGOUT THE CURRUENT USER
  async function logout() {
    await auth.signOut();
    navigate("/");
  }
  return {
    signup,
    logout,
    signin,
  };
};

export default useAuth;

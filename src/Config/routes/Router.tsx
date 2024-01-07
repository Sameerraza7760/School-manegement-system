import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import ChooseUser from "../../Pages/ChooseUser/ChooseUser";
import AdminRegester from "../../Pages/Admin/AdminRegester/AdminRegester";
import Login from "../../Pages/Login/Login";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import Logout from "../../Pages/Logout/Logout";
import AdminProfile from "../../Pages/Admin/AdminProfile/AdminProfile";
import AddClass from "../../Pages/Admin/ClassRelated/AddClass";
import ClassDetail from "../../Pages/Admin/ClassRelated/ClassDetail";
import AddStudentForm from "../../Pages/Admin/ClassRelated/AddStudentForm/StudentForm";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chooseUser" element={<ChooseUser />}></Route>
      <Route path="/adminSignup" element={<AdminRegester />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/adminHome" element={<AdminHome />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/adminProfile" element={<AdminProfile />}></Route>
      <Route path="/classAdd" element={<AddClass />}></Route>
      <Route path="/classDetail/:id" element={<ClassDetail />}></Route>
      <Route path="/StudentForm" element={<AddStudentForm />}>
        {" "}
      </Route>
    </Routes>
  );
};

export default AppRouter;

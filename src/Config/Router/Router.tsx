import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./../../Pages/Home/Home";
import ChooseUser from "../../Pages/ChooseUser/ChooseUser";
import AdminRegester from "../../Pages/Admin/AdminRegester/AdminRegester";
import Login from "./../../Pages/Login/Login";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import Logout from "../../Pages/Logout/Logout";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chooseUser" element={<ChooseUser />}></Route>
      <Route path="/adminSignup" element={<AdminRegester />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/adminHome" element={<AdminHome/>} ></Route>
      <Route path="/logout" element={<Logout/>} ></Route>
    </Routes>
  );
};

export default AppRouter;

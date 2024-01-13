import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../../Pages/Admin/AdminHome/AdminHome";
import AdminProfile from "../../Pages/Admin/AdminProfile/AdminProfile";
import AdminRegester from "../../Pages/Admin/AdminRegester/AdminRegester";
import AddClass from "../../Pages/Admin/ClassRelated/AddClass";
import AddStudentForm from "../../Pages/Admin/ClassRelated/AddStudentForm/StudentForm";
import ClassDetail from "../../Pages/Admin/ClassRelated/ClassDetail";
import ClassList from "../../Pages/Admin/ClassRelated/ClassList";
import AdminNoticePage from "../../Pages/Admin/Notice/Notice";
import StudentList from "../../Pages/Admin/Studentlist/StudentList";
import AdminStudentPage from "../../Pages/Admin/Studentlist/StudentRelated/AllStudent";
import AddSubject from "../../Pages/Admin/SubjectRelated/AddSubject";
import ShowSubject from "../../Pages/Admin/SubjectRelated/ShowSubject";
import SubjectList from "../../Pages/Admin/SubjectRelated/SubjectList";
import TeacherForm from "../../Pages/Admin/TeacherRelated/TeacherForm";
import TeacherDetailsPage from "../../Pages/Admin/TeacherRelated/TeacherList";
import ChooseUser from "../../Pages/ChooseUser/ChooseUser";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Logout from "../../Pages/Logout/Logout";
import StudentComplain from "../../Pages/Student/StudentComplain/StudentComplain";
import StudentDashboard from "../../Pages/Student/StudentProfile/StudentDashboard/StudentDashboard";
import StudentProfile from "../../Pages/Student/StudentProfile/StudentProfile";
import StudentSubjects from "../../Pages/Student/StudentSubject/StudentSubject";
import ViewAttendance from "../../Pages/Student/ViewAttendence/ViewAttendence";
import StudentLogout from "../../Pages/Student/StudentLogout/StudentLogout";
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chooseUser" element={<ChooseUser />}></Route>
      <Route path="/adminSignup" element={<AdminRegester />}></Route>
      <Route path="/Login/:Role" element={<Login />}></Route>
      <Route path="/adminHome" element={<AdminHome />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/adminProfile" element={<AdminProfile />}></Route>
      <Route path="/classAdd" element={<AddClass />}></Route>
      <Route path="/classDetail/:id" element={<ClassDetail />}></Route>
      <Route path="/StudentForm/:classRoomid" element={<AddStudentForm />}>
        {" "}
      </Route>
      <Route path="/studentList/:classRoomid" element={<StudentList />}></Route>
      <Route path="/addSubject/:classRoomid" element={<AddSubject />}></Route>
      <Route
        path="/subjectDetail/:classRoomid"
        element={<ShowSubject />}
      ></Route>
      <Route path="/ClassList" element={<ClassList />}></Route>
      <Route path="/SubjectList" element={<SubjectList />}></Route>
      <Route path="/TeacherForm" element={<TeacherForm />}></Route>
      <Route path="/noticeAdmin" element={<AdminNoticePage />}></Route>
      <Route path="/AllStudent" element={<AdminStudentPage />}></Route>
      <Route path="/TeacherDetail/:id" element={<TeacherDetailsPage />} />

      <Route path="/StudentDashboard" element={<StudentDashboard />}>
        <Route path="Sprofile" element={<StudentProfile />} />
        <Route path="Ssubjects" element={<StudentSubjects />} />
        <Route path="SViewAttendence" element={<ViewAttendance />} />
        <Route path="SComplain" element={<StudentComplain />} />
        <Route path="SLogout" element={<StudentLogout/>} ></Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;

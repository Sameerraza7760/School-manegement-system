import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTeacher from "../../../hooks/useTeacher";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "./../../components/Header/Header";
import { useDispatch } from "react-redux";
import { enrolledTeachers } from "../../../Config/store/slice/TeachersSlice";
import { useSelector } from "react-redux";
const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedClass = location.state;
  const teacherDetail = selectedClass.teacherDetail;
  const { addTeacherInDB } = useTeacher();
  const classId = useSelector((state: any) => state.class.classes);
  console.log(classId);

  const [formData, setFormData] = useState<TeacherInfo>({
    teacherName: "",
    password: "",
    email: "",
    phoneNumber: 0,
    ...teacherDetail,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      formData.teacherName === "" ||
      formData.email === "" ||
      formData.phoneNumber === null
    ) {
      alert("please fill all inputs");
    }
    try {
      await addTeacherInDB(formData);

      console.log("Form Submitted:", formData);
      toast.success("teacher Add");

      setTimeout(() => {
        dispatch(enrolledTeachers(formData));
        navigate("/classAdd");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[80px]">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Teacher Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-600 mb-2 block">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-600 mb-2 block">
                Select Classes:
              </label>
              <div className="flex flex-wrap gap-2">
                {/* Replace 'availableClasses' with your actual list of classes */}
                {/* {selectedClass.selectedSubjects.map(
                  (classItem: TeacherInfo) => (
                    <button
                      key={classItem.classId}
                      type="button"
                      className={`${"bg-purple-500 text-white"} py-2 px-4 rounded-md focus:outline-none`}
                    >
                      {classItem.className}
                    </button>
                  )
                )} */}
              </div>
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TeacherForm;

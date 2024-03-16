import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { teacherInfoSchema } from "../../../Schema/teacherSchema";
import useTeacher from "../../../hooks/useTeacher";
import { TeacherInfo } from "../../../types/types.teacher";
import Header from "./../../components/Header/Header";
const TeacherForm = () => {
  const location = useLocation();
  const selectedClass = location.state;
  const teacherDetail = selectedClass.teacherDetail;
  const { addTeacherInDB } = useTeacher();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TeacherInfo>({
    resolver: zodResolver(teacherInfoSchema),
  });

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const formData: TeacherInfo = { ...teacherDetail, ...data };
      await addTeacherInDB(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container w-] mx-auto mt-[80px]">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Teacher Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-600 mb-2 block">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border rounded-md p-2"
                {...register("teacherName")}
              />{" "}
              {errors.teacherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.teacherName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full border rounded-md p-2"
              />{" "}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full border rounded-md p-2"
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                {...register("phoneNumber")}
                className="w-full border rounded-md p-2"
              />{" "}
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default TeacherForm;

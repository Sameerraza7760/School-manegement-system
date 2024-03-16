import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentSchema } from "../../../../Schema/studentSchema";
import useStudent from "../../../../hooks/useStudent";
import { StudentDetail } from "../../../../types/types.student";
import Header from "../../../components/Header/Header";
const AddStudentForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<StudentDetail>({
    resolver: zodResolver(StudentSchema),
  });


  const { classRoomid } = useParams();

  const schoolId: string = useSelector(
    (state: any) => state?.admin?.admin?.schoolid
  );

  const { addStudentDetail } = useStudent();

  const onSubmit = async (data: Record<string, any>) => {
    const studentDetail: StudentDetail = {
      ...data,
      schoolId,
    };
    console.log(studentDetail);

    if (classRoomid) {
      try {
        await addStudentDetail(studentDetail, classRoomid);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container w-full mx-auto mt-[100px] flex justify-center items-center"
      >
        <div className="w-[90%] sm:w-[70%] mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">
            Enroll Student
          </h2>
          <div className="mb-6">
            <label
              htmlFor="studentName"
              className="text-gray-600 block text-sm mb-2"
            >
              Student Name:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.studentName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="studentName"
              {...register("studentName")}
              placeholder="Enter Student Name"
              autoComplete="off"
            />
            {errors.studentName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentName.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="studentRollNo"
              className="text-gray-600 block text-sm mb-2"
            >
              Roll Number:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.studentRollNum ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="studentRollNo"
              {...register("studentRollNum")}
              placeholder="Enter Roll Number"
              autoComplete="off"
            />
            {errors.studentRollNum && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentRollNum.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="studentClass"
              className="text-gray-600 block text-sm mb-2"
            >
              Class:
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.studentClass ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-purple-500`}
              id="className"
              {...register("studentClass")}
              placeholder="Enter Student Class"
              autoComplete="ClassName"
            />
            {errors.studentClass && (
              <p className="text-red-500 text-sm mt-1">
                {errors.studentClass.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none ${
              isSubmitting && "cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Enrolling..." : "Enroll Student"}
          </button>
        </div>

        <ToastContainer />
      </form>
    </>
  );
};

export default AddStudentForm;

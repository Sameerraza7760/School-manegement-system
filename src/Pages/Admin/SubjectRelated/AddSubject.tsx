import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { subjectSchema } from "../../../Schema/subjectSchema";
import useSubject from "../../../hooks/useSubject";
import Header from "./../../components/Header/Header";
function AddSubject() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(subjectSchema),
  });

  const { classRoomid } = useParams();
  const { addSubjectinClass } = useSubject();

  const onSubmit = async (data: Record<string, any>) => {
    const subject = data.subjectName;

    if (classRoomid) {
      await addSubjectinClass(classRoomid, subject);
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-[100px] bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Add Subject</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="subjectName" className="text-gray-600 block">
              Subject Name:
            </label>
            <input
              type="text"
              id="subjectName"
              {...register("subjectName")}
              className="w-full border rounded-md p-2 focus:outline-none focus:border-purple-500"
            />
            {errors.subjectName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subjectName.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none"
          >
            {isSubmitting ? "Add..." : "Add Subject"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSubject;

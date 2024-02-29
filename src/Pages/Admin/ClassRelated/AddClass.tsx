import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useClassRoom from "../../../hooks/useClassRoom";
import { ClassRoom } from "../../../types/types.class";
import Header from "../../components/Header/Header";

const ClassAdd = () => {
  const schoolId: string = useSelector(
    (state: any) => state?.admin?.admin?.schoolid
  );
  const classes = useSelector((state: any) => state.class.classes);
  const { addClassToDb, deleteClassFromDb, getClassesFromDb } = useClassRoom();

  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const handleAddClass = async () => {
    if (className.trim() !== "") {
      await addClassToDb(className, schoolId);
      await getClassesFromDb(schoolId);
      setClassName("");
      toast.success("Class Add");
    }
  };

  const deleteClass = async (id: string) => {
    await deleteClassFromDb(id);
    toast.warn("Class Deleted");
    getClassesFromDb(schoolId);
  };

  useEffect(() => {
    getClassesFromDb(schoolId);
  }, []);

  // const filterClasses: ClassRoom[] = classes?.filter(
  //   (item: ClassRoom) => item.schoolid === schoolId
  // );

  return (
    <>
      <Header />
      <div className="bg-gray-200 min-h-screen">
        <div className="container mx-auto p-4 mt-[60px] ">
          <div className="bg-white p-6 rounded-md shadow-md mt-9 ">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">New Class</h2>

            <div className="mb-4">
              <label htmlFor="className" className="text-gray-600 block">
                Class Name:
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="className"
                  name="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none w-[90%]"
                  placeholder="Enter class name"
                />
                <button
                  onClick={handleAddClass}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none w-[150px]"
                >
                  Add Class
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                Class List
              </h3>
              <ul className="space-y-4">
                {classes?.map((item:ClassRoom) => (
                  <li
                    key={item.id}
                    className="bg-gray-100 p-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {item.className}
                      </span>
                      <div className="flex gap-4">
                        <button
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          onClick={() =>
                            navigate(`/classDetail/${item.id || ""}`)
                          }
                        >
                          View Detail
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                          onClick={() => deleteClass(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>{" "}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ClassAdd;

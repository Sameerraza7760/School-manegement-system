import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { ClassRoom } from "../../../types/types.class";

const ClassAdd = () => {
  const { addClassToDb, deleteClassFromDb, getClassesFromDb } = useClassRoom();
  const schoolId: string = useSelector(
    (state: any) => state.auth.users.schoolid
  );
  console.log(schoolId);
  

  const [className, setClassName] = useState("");
  const [classList, setClassList] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleAddClass = async () => {
    if (className.trim() !== "") {
      await addClassToDb(className, schoolId);
      toast.success("Class Added");
      setShowSuccessMessage(true);
      setClassName("");
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showSuccessMessage) {
      timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showSuccessMessage, setShowSuccessMessage]);

  const deleteClass = async (id: string) => {
    await deleteClassFromDb(id);
    toast.warn("Class Deleted");
    setShowSuccessMessage(true);
  };

  useEffect(() => {
    const getClass = async () => {
      const classes: ClassRoom[] = await getClassesFromDb();
      const filterClasses: ClassRoom[] = classes.filter(
        (item) => item.schoolid === schoolId
      );
      setClassList(filterClasses);
    };
    getClass();
  }, [showSuccessMessage]);

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
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
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
                {classList.map((item) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassAdd;

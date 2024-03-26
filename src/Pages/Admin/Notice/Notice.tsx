import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { notics } from "../../../types/type.notics";
import Header from "../../components/Header/Header";
const AdminNoticePage = () => {
  const { addNoticeinDb } = useAuth();
  const [noticeText, setNotice] = useState("");
  const schoolId = useSelector((state: any) => state.admin.admin.schoolid);

  const handleCreateNotice = async () => {
    if (noticeText.trim() !== "") {
      const notice: notics = { schoolid: schoolId, noticeContent: noticeText };
      try {
        await addNoticeinDb(notice);
        toast.success("Notics Add");
        setNotice("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[170px]">
        <div className="w-[90%] sm:max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create Notice
          </h2>
          <textarea
            className="w-full h-40 p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Type your notice here..."
            value={noticeText}
            onChange={(e) => setNotice(e.target.value)}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleCreateNotice}
          >
            Create Notice
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminNoticePage;

import { useState } from "react";
import Header from "../../components/Header/Header";
const AdminNoticePage = () => {
  const [notice, setNotice] = useState("");

  const handleNoticeChange = (e: any) => {
    setNotice(e.target.value);
  };

  const handleCreateNotice = () => {
    console.log("Notice created:", notice);
    setNotice("");
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[170px]">
        <div className="max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Create Notice
          </h2>
          <textarea
            className="w-full h-40 p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Type your notice here..."
            value={notice}
            onChange={handleNoticeChange}
          ></textarea>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleCreateNotice}
          >
            Create Notice
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminNoticePage;

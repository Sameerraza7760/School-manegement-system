import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { notics } from "../../../types/type.notics";

function Notice() {
  const schoolId = useSelector((state: any) => state.admin.admin.schoolid);


  const { getNoticeFromDb } = useAuth();
  const [noticeText, setNotice] = useState<notics | null>();
  useEffect(() => {
    const getNotics = async () => {
      const noticsTxt: notics | null = await getNoticeFromDb(schoolId);
      console.log("hi==>", noticsTxt);
      if (noticsTxt) {
        setNotice(noticsTxt); 
      }
    };
    getNotics();
  }, [schoolId]);
  return (
    <div className="container mt-8 mx-auto w-[90%]">
      <div className="w-full mx-auto  bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2 className="text-2xl font-bold">Important Notice</h2>
          {/* <p className="text-gray-500">{noticeText?.timestamp}</p> */}
        </div>
        <p className="text-gray-700 mb-4">{noticeText?.noticeContent}</p>

        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notice;

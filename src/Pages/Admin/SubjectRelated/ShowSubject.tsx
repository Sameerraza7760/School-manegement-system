import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useClassRoom from "../../../hooks/useClassRoom";
import { ClassRoom } from "../../../types/types.class";
import Header from "./../../components/Header/Header";

function ShowSubject() {
  const [subject, setSubject] = useState<ClassRoom | null>();
  const { getClassDetailById } = useClassRoom();
  const { classRoomid } = useParams();

  useEffect(() => {
    const getClassDetail = async () => {
      if (classRoomid) {
        const getClassDetail: ClassRoom | null = await getClassDetailById(
          classRoomid
        );
        setSubject(getClassDetail);
      }
    };
    getClassDetail();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[90px] p-8 bg-white rounded-lg shadow-md max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Subjects</h2>

        {/* Subject List */}
        {subject && subject.subjects && subject.subjects.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subject?.subjects?.map((item) => (
              <li
                key={subject.id}
                className="p-4 bg-gray-100 rounded-md shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item}
                </h3>
                {/* Add additional information or actions related to each subject if needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">No subjects available for this class.</p>
        )}
      </div>
    </>
  );
}

export default ShowSubject;

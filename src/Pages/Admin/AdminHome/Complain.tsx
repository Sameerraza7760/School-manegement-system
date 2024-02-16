import Header from "../../components/Header/Header";
import useStudent from "../../../hooks/useStudent";
import { useEffect, useState } from "react";
import { Complain } from "../../../types/type.complain";

const ComplainsPage = () => {
  const { getComplaints } = useStudent();
  const [complaints, setComplaints] = useState<Complain[]>([]);

  const generalComplaints = [
    { id: 1, complaint: "This is a general complaint 1." },
    { id: 2, complaint: "This is a general complaint 2." },
  ];

  useEffect(() => {
    const getAllComplaints = async () => {
      const fetchedComplaints = await getComplaints();
      setComplaints(fetchedComplaints);
    };

    getAllComplaints();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-[130px]">
        <h1 className="text-3xl font-semibold mb-6">Complaints</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Teacher Complaints */}
          <div className="bg-white p-6 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4">Teacher Complaints</h2>
            {complaints.filter((item) => item.Role === "Teacher").length > 0 ? (
              <ul>
                {complaints
                  .filter((item) => item.Role === "Teacher")
                  .map((complaint, index) => (
                    <li key={index} className="mb-2">
                      <strong>{complaint.complaintsName}:</strong>{" "}
                      {complaint.complainContent}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Teacher Complaints</p>
            )}
          </div>

          {/* Student Complaints */}
          <div className="bg-white p-6 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4">Student Complaints</h2>
            {complaints.filter((item) => item.Role === "Student").length > 0 ? (
              <ul>
                {complaints
                  .filter((item) => item.Role === "Student")
                  .map((complaint, index) => (
                    <li key={index} className="mb-2">
                      <strong>
                        {complaint.complaintsName} ({complaint.complaintsClass}{" "}
                        - {complaint.number}):
                      </strong>{" "}
                      {complaint.complainContent}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Student Complaints</p>
            )}
          </div>

          {/* General Complaints */}
          <div className="bg-white p-6 rounded-md cursor-pointer shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4">General Complaints</h2>
            {generalComplaints.length > 0 ? (
              <ul>
                {generalComplaints.map((complaint) => (
                  <li key={complaint.id} className="mb-2">
                    {complaint.complaint}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No General Complaints</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainsPage;

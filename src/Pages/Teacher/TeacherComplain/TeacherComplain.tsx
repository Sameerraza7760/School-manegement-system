import { useState } from "react";

const TeacherComplain = () => {
  const [complaint, setComplaint] = useState("");

  const handleComplaintChange = (event: any) => {
    setComplaint(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Complaint submitted:", complaint);
  };

  return (
    <div className="flex items-center justify-center mt-9 ">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4">Teacher Complaint Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-600"
            >
              Describe your complaint
            </label>
            <textarea
              id="complaint"
              name="complaint"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={complaint}
              onChange={handleComplaintChange}
              required
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TeacherComplain;

import React, { useState } from "react";

const StudentComplain = () => {
  const [complainText, setComplainText] = useState("");

  const handleComplainSubmit = (e: any) => {
    e.preventDefault();
    // Add logic to handle complaint submission
    console.log("Complaint Submitted:", complainText);
    // You can send the complaint to the server or handle it as needed
  };

  return (
    <div className="container mx-auto mt-8 ml-3">
      <h1 className="text-3xl font-semibold mb-4">Submit a Complaint</h1>
      <form
        onSubmit={handleComplainSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="complainText"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Your Complaint
          </label>
          <textarea
            id="complainText"
            name="complainText"
            // rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter your complaint here"
            value={complainText}
            onChange={(e) => setComplainText(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentComplain;

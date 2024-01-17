import React from "react";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
}

interface CompletedAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submission: string;
  student: Student;
}

const ViewCompletedAssignments: React.FC = () => {
  const completedAssignments: CompletedAssignment[] = [
    {
      id: "1",
      title: "Completed React Assignment",
      description:
        "Student completed a React application with CRUD functionality.",
      dueDate: "2023-01-31",
      submission:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
      student: {
        id: "s1",
        name: "John Doe",
        rollNumber: "R12345",
      },
    },
    {
      id: "2",
      title: "Completed JavaScript Quiz",
      description:
        "Student prepared and submitted a quiz covering various JavaScript concepts.",
      dueDate: "2023-02-15",
      submission:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
      student: {
        id: "s2",
        name: "Jane Doe",
        rollNumber: "R67890",
      },
    },
    {
      id: "3",
      title: "Completed CSS Styling Project",
      description:
        "Student built and submitted a webpage showcasing advanced CSS styling techniques.",
      dueDate: "2023-03-10",
      submission:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...",
      student: {
        id: "s3",
        name: "Alice Smith",
        rollNumber: "R54321",
      },
    },
  ];

  return (
    <div className="mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Completed Assignments</h2>
      {completedAssignments.length === 0 ? (
        <p>No completed assignments available.</p>
      ) : (
        <div>
          {completedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white p-6 rounded-md shadow-md mb-4 transition duration-300 ease-in-out transform hover:scale-100 cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{assignment.title}</h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-gray-600">Due Date: {assignment.dueDate}</p>
              <div className="mt-4">
                <label className="block text-gray-600 font-semibold">Student's Name:</label>
                <p className="text-blue-600">{assignment.student.name}</p>
                <label className="block text-gray-600 font-semibold">
                  Student's Roll Number:
                </label>
                <p className="text-blue-600">{assignment.student.rollNumber}</p>
                <label className="block text-gray-600 font-semibold">
                  Student's Submission:
                </label>
                <p className="whitespace-pre-line">{assignment.submission}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCompletedAssignments;
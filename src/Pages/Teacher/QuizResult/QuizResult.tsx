import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useQuiz from "../../../hooks/useQuiz";
import { StudentResult } from "../../../types/types.student";
const QuizResult = () => {
  const { getResultsOfStd } = useQuiz();
  const [results, setResults] = useState<StudentResult[] | null>(null);
  const classId = useSelector((state: any) => state?.teacher?.teacher.classId);
  console.log(classId);

  useEffect(() => {
    const getStudentsResult = async () => {
      const results = await getResultsOfStd(classId);
      if (results) {
        setResults(results);
      }
    };
    getStudentsResult();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Student Results</h2>
      {results?.map((result, index) => (
        <div key={index} className="bg-white p-8 rounded-md shadow-lg mb-4">
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl font-bold text-blue-500">
              {result.quizResult}%
            </span>
          </div>
          <p className="text-gray-800">
            {result.studentName}'s Score: {result.quizResult}%
          </p>
          <p className="text-gray-800">Quiz Title: {result.studentName}</p>
          <div className="mt-4">
            <p className="text-gray-600">
              Congratulations to {result.studentName} on completing the quiz!
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizResult;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useQuiz from "../../../hooks/useQuiz";
import { Question } from "../../../types/type.quiz";
import { StudentDetail, StudentResult } from "../../../types/types.student";
import { useCowndown } from "../../../hooks/useCowndown";
import { useNavigate } from "react-router-dom";
// import { Student } from "../../../types/types.stundent";
interface QuizProps {
  quizId: string | undefined;
}
const Quiz = ({ quizId }: QuizProps) => {
  const navigate = useNavigate();
  const studentData: StudentDetail = useSelector(
    (state: any) => state?.student?.student
  );
  const { getQuizById, addResultofQuiz } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestion] = useState<Question[]>([]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const getQuizbyId = async () => {
    if (quizId) {
      const quiz = await getQuizById(quizId);
      if (quiz?.questions) {
        setQuestion(quiz.questions);
      }
    }
  };

  useEffect(() => {
    getQuizbyId();
  }, []);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion === questions?.length - 1) {
      addResultOfUser();
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculatePercentage = () => {
    if (questions) {
      return (score / questions.length) * 100;
    }
  };

  const addResultOfUser = async () => {
    const stdData: StudentResult = {
      studentName: studentData.studentName,
      RollNumber: studentData.studentRollNum,
      quizResult: calculatePercentage(),
      classId: studentData.studentid?.slice(0, 20),
      studentId: studentData.studentid,
      quizId: quizId,
    };
    await addResultofQuiz(stdData);
  };

  const renderQuizContent = () => {
    if (currentQuestion < questions.length) {
      return (
        <>
          {" "}
          <div className="mb-8">
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            {selectedOption && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Quiz Finished!</h2>{" "}
            <p className="text-xl font-semibold">Your Score is recorderd</p>
            <p className="text-gray-700">Your Score: {calculatePercentage()}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/studentDashboard")}
            >
              Finish Quiz
            </button>
          </div>
        </>
      );
    }
  };
  const time = useCowndown(200, addResultOfUser);
  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Time!</h1>
      <div className="mb-4 text-center">
        <p className="text-gray-700">
          Time Remaining: {Math.floor(time / 60)}:
          {(time % 60).toString().padStart(2, "0")}
        </p>
      </div>
      <div>{renderQuizContent()}</div>

      <ToastContainer />
    </div>
  );
};

export default Quiz;

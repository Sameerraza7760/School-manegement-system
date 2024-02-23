import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useQuiz from "../../../hooks/useQuiz";
import { Question } from "../../../types/type.quiz";
import { StudentResult } from "../../../types/types.student";
const Quiz = () => {
  const studentData = useSelector((state: any) => state.student.student);
  const { quizId } = useParams();
  const { getQuizById, addResultofQuiz } = useQuiz();
  console.log(studentData);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestion] = useState<Question[]>([]);
  const [time, setTime] = useState(300);
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const getQuizbyId = async () => {
    if (quizId) {
      const quiz = await getQuizById(quizId);
      if (quiz) {
        setQuestion(quiz.questions);
        setTime(quiz.timeLimit * 60);
      }
      console.log(quiz);
    }
  };

  useEffect(() => {
    getQuizbyId();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time <= 0) {
      clearInterval(timer);
      console.log("Quiz timed out!");
    }

    return () => clearInterval(timer);
  }, [time]);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinishQuiz = () => {
    console.log("Quiz finished. Score:", score);
  };
  const calculatePercentage = (): number => {
    return (score / questions.length) * 100;
  };
  useEffect(() => {
    const addResultOfUser = async () => {
      if (currentQuestion !== questions.length) return;
      const stdData: StudentResult = {
        studentName: studentData.studentName,
        RollNumber: studentData.studentRollNum,
        quizResult: calculatePercentage(),
        classId: studentData.studentid.slice(0, 20),
        studentId: studentData.studentid,
        quizId: quizId,
      };
      await addResultofQuiz(stdData);
      console.log(questions.length);

      return;
    };
    console.log(currentQuestion);
    addResultOfUser();
  }, [currentQuestion]);
  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Time!</h1>
      <div className="mb-4 text-center">
        <p className="text-gray-700">
          Time Remaining: {Math.floor(time / 60)}:
          {(time % 60).toString().padStart(2, "0")}
        </p>
      </div>
      {currentQuestion < questions.length ? (
        <>
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
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Quiz Finished!</h2>{" "}
            <p className="text-xl font-semibold">Your Score is recorderd</p>
            <p className="text-gray-700">Your Score: {calculatePercentage()}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFinishQuiz}
            >
              Finish Quiz
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;

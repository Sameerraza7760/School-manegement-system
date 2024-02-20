import { useEffect, useState } from "react";
import useQuiz from "../../../hooks/useQuiz";
import { Question } from "../../../types/type.quiz";

import { useParams } from "react-router-dom";
const Quiz = () => {
  const { quizId } = useParams();
  const { getQuizById } = useQuiz();
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
      if (quiz) {
        setQuestion(quiz.questions);
      }
      console.log(quiz);
    }
  };
  useEffect(() => {
    getQuizbyId();
  }, []);

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleFinishQuiz = () => {
    // You can add logic here to submit the quiz or display the score
    console.log("Quiz finished. Score:", score);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Time!</h1>
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
            <h2 className="text-xl font-semibold">Quiz Finished!</h2>
            <p className="text-gray-700">
              Your Score: {score} / {questions.length}
            </p>
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
    </div>
  );
};

export default Quiz;

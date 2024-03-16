import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useQuiz from "../../../hooks/useQuiz";
import { Question } from "../../../types/type.quiz";
import { useNavigate } from "react-router-dom";
const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const {
    teacher: { classId },
  } = useSelector((state: any) => state.teacher);
  console.log(classId);

  const { submitQuizTest } = useQuiz();
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number>(10);
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", "", ""], correctAnswer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", ""], correctAnswer: "" },
    ]);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    index: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    console.log("Quiz Submitted:", { quizTitle, questions });
    await submitQuizTest(quizTitle, questions, classId, timeLimit);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Create Quiz</h2>
      <div className="bg-white p-8 rounded-md shadow-lg">
        <label className="block mb-4 text-gray-800">
          Quiz Title:
          <input
            type="text"
            className="block w-full mt-1 p-2 border rounded-md"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </label>
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <label className="block mb-2 text-gray-800">
              Question {index + 1}:
              <input
                type="text"
                className="block w-full mt-1 p-2 border rounded-md"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block mb-2 text-gray-800">
                  Option {optionIndex + 1}:
                  <input
                    type="text"
                    className="block w-full mt-1 p-2 border rounded-md"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                  />
                </label>
              ))}
            </div>

            <label className="block mb-2 text-gray-800">
              Correct Answer:
              <input
                type="text"
                className="block w-full mt-1 p-2 border rounded-md"
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(index, "correctAnswer", e.target.value)
                }
              />
            </label>

            <button
              className="text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => removeQuestion(index)}
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>{" "}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => navigate("/TResult")}
        >
          Show Result
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateQuiz;

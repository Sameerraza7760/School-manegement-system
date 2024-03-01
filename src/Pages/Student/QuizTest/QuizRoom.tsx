import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
function QuizRoom() {
  console.log("componentrendered");

  const { quizId } = useParams();
  // console.log("f", quizId);

  return (
    <div>
      <Quiz quizId={quizId} />
    </div>
  );
}

export default QuizRoom;

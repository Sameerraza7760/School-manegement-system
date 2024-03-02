import { useParams } from "react-router-dom";
import Quiz from "./Quiz";
function QuizRoom() {
  const { quizId } = useParams();

  return (
    <div>
      <Quiz quizId={quizId} />
    </div>
  );
}

export default QuizRoom;

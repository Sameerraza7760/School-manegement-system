import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { messegeData } from "../../../types/type.message";
import { StudentDetail } from "../../../types/types.student";
import useChat from "../../../hooks/useChat";
function StudentChat() {
  const { sendMessegeToDb, getMessagesFromDb } = useChat();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<messegeData[]>([]);
  const [getMessege, setGetMessege] = useState<boolean>(false);
  const navigate = useNavigate();
  const { teacherId } = useParams<{ teacherId: string }>();
  const currentStudent: StudentDetail = useSelector(
    (state: any) => state.student.student
  );
  const handleSendMessege = async () => {
    const messageData: messegeData = {
      message: newMessage,
      studentName: currentStudent?.studentName,
      senderId: currentStudent.studentid,
      receiverId: teacherId,
      timestamp: serverTimestamp(),
      chatRoomId: {
        [teacherId]: true,
        [currentStudent.studentid]: true,
      },
      chatRoom: {
        message: [newMessage],
        timestamp: Date.now(),
      },
    };
    messageData.chatRoom.message = arrayUnion(newMessage);
    setGetMessege(true);
    await sendMessegeToDb(messageData);
    setNewMessage(" ");
  };
  const getMesseges = async () => {
    const unsubscribe = getMessagesFromDb(
      teacherId,
      currentStudent.studentid,
      (messages) => {
        console.log("Filtered Messages:", messages);
        if (messages) {
          setMessages(messages);
          setGetMessege(false);
        }
      }
    );
  };
  useEffect(() => {
    getMesseges();
  }, []);
  return (
    <div className="flex h-auto bg-gray-100">
      <div className="flex-1 p-4 overflow-y-scrol ">
        <div className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Chat with Teacher A</h2>
        </div>

        <div className="flex flex-col space-y-4 h-[67vh] overflow-y-scroll p-4">
  {Array.isArray(messages) &&
    messages.map((item, index) =>
      Array.isArray(item.chatRoom.message) &&
      item.chatRoom.message.map((message, messageIndex) => (
        <div
          key={messageIndex}
          className={`${
            index % 2 === 0
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white self-end"
          } p-3 rounded-md max-w-[80%]`}
        >
          <span className="text-gray-600 font-semibold">
            {currentStudent.studentName}:
          </span>{" "}
          {message}
        </div>
      ))
    )}
</div>

        <div className="mt-4 flex items-center">
          <textarea
            className="flex-1 p-3 border rounded-md focus:outline-none"
            placeholder="Type your message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
          <button
            onClick={handleSendMessege}
            className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentChat;

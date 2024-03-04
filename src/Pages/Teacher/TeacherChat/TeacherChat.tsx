import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useChat from "../../../hooks/useChat";
import { messegeData } from "../../../types/type.message";
import { TeacherInfo } from "../../../types/types.teacher";
function TeacherChat() {
  const { studentId } = useParams<{ studentId: string }>();

  const { sendMessegeToDb, getMessagesFromDb } = useChat();
  const currentTeacher: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<messegeData[]>([]);

  const handleSendMessage = async () => {
    const messageData: messegeData = {
      message: newMessage,
      email: currentTeacher?.email,
      senderId: currentTeacher.teacherId,
      receiverId: studentId,
      timestamp: serverTimestamp(),
      chatRoomId: {
        [studentId]: true,
        [currentTeacher.teacherId]: true,
      },
      chatRoom: {
        message: [newMessage],
        timestamp: Date.now(),
      },
    };
    messageData.chatRoom.message = arrayUnion(newMessage);
    // setGetMessege(true);
    await sendMessegeToDb(messageData);
    setNewMessage(" ");
  };
  const getMesseges = async () => {
    const unsubscribe = getMessagesFromDb(
      studentId,
      currentTeacher.teacherId,
      (messages) => {
        console.log("Filtered Messages:", messages);
        if (messages) {
          setMessages(messages);
          // setGetMessege(false);
        }
      }
    );
  };

  useEffect(() => {
    const chat = async () => {
      await getMesseges();
    };
    chat();
  }, [currentTeacher.teacherId]);
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-scroll ">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Chat with Student A</h2>
        </div>

        <div className="flex flex-col space-y-4 mt-3 ">
          {Array.isArray(messages) &&
            messages.map(
              (item, index) =>
                Array.isArray(item.chatRoom.message) &&
                item.chatRoom.message.map((message, messageIndex) => (
                  <div key={messageIndex} className="flex items-start">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src="https://via.placeholder.com/40"
                      alt="User"
                    />
                    <div
                      className={`flex items-start w-full ${
                        item.senderId === currentTeacher.teacherId
                          ? "bg-blue-200"
                          : "bg-green-200"
                      } p-3 rounded-lg w-3/4`}
                    >
                      <p className="text-sm text-blue-800 font-semibold">
                        {message}
                      </p>
                    </div>
                  </div>
                ))
            )}

          {/* Chat Input */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex items-center">
            <textarea
              className="flex-1 p-3 border rounded-md focus:outline-none"
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button
              onClick={handleSendMessage}
              className="ml-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherChat;

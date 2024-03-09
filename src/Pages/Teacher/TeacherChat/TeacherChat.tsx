import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useChat from "../../../hooks/useChat";
import { useGetmessages } from "../../../hooks/useGetmessages";
import { messegeData } from "../../../types/type.message";
import { TeacherInfo } from "../../../types/types.teacher";
import Messages from "../../components/Messeges/Messeges";
function TeacherChat() {
  const { studentId } = useParams<{ studentId: string }>();

  const { sendMessegeToDb } = useChat();
  const currentTeacher: TeacherInfo = useSelector(
    (state: any) => state.teacher.teacher
  );
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }
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

    await sendMessegeToDb(messageData);
    setNewMessage(" ");
  };

  const messages = useGetmessages(studentId, currentTeacher.teacherId); // just give the student id and teacherid it gives the chat of there

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-y-scroll ">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Chat with Student A</h2>
        </div>

        <div className="flex flex-col space-y-4 mt-3 ">
          <div className="flex flex-col space-y-4 h-[67vh] overflow-y-scroll p-4">
            {Array.isArray(messages) &&
              messages.map(
                (item) =>
                  Array.isArray(item.chatRoom.message) &&
                  item.chatRoom.message.map((message, messageIndex) => (
                    <Messages key={messageIndex} message={message} />
                  ))
              )}
          </div>

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

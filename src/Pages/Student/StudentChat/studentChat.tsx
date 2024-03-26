import { arrayUnion, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useChat from "../../../hooks/useChat";
import { useGetmessages } from "../../../hooks/useGetmessages";
import { messegeData } from "../../../types/type.message";
import { StudentDetail } from "../../../types/types.student";
import Messages from "../../components/Messeges/Messeges";
function StudentChat() {
  const { sendMessegeToDb } = useChat();
  const [newMessage, setNewMessage] = useState<string>("");

  const { teacherId } = useParams<{ teacherId: string }>();
  const currentStudent: StudentDetail = useSelector(
    (state: any) => state.student.student
  );
  const handleSendMessege = async () => {
    if (!newMessage.trim() || !teacherId || !currentStudent?.studentid) {
      return;
    }

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
    await sendMessegeToDb(messageData);
    setNewMessage(" ");
  };

  const messages = useGetmessages(currentStudent.studentid, teacherId); // just give the student and teacher id anD this custom hoom return there messages

  return (
    <div className="flex h-auto bg-gray-100">
      <div className="flex-1 p-4 overflow-y-scrol">
        <div className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Chat with Teacher A</h2>
        </div>
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

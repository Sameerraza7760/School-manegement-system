import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { messegeData } from "../types/type.message";

const useChat = () => {
  const sendMessegeToDb = async (messageData: messegeData) => {
    const { senderId, receiverId } = messageData;
    const chatId = [receiverId, senderId].sort().join("-");
    const messagesRef = doc(db, "messages", chatId);
    try {
      await setDoc(messagesRef, messageData, { merge: true });
      console.log("Message sent successfully!");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };
  const getMessagesFromDb = (
    teacherId: string | undefined,
    studentId: string | undefined,
    callback: (messages: messegeData[]) => void
  ) => {
    const messagesCollection = collection(db, "messages");
    [teacherId, studentId].sort().join("-");

    const q = query(
      messagesCollection,
      where(`chatRoomId.${studentId}`, "==", true),
      where(`chatRoomId.${teacherId}`, "==", true)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messages: messegeData[] = [];

        querySnapshot.forEach((doc) => {
          const messageData = doc.data() as messegeData;
          messages.push(messageData);
        });

        callback(messages);
      },
      (error) => {
        console.error("Error getting messages:", error);
      }
    );

    return unsubscribe;
  };

  return {
    sendMessegeToDb,
    getMessagesFromDb,
  };
};

export default useChat;

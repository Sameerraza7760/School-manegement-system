import { useEffect, useState } from "react";
import { messegeData } from "../types/type.message";
import useChat from "./useChat";

export const useGetmessages = (
  studentId: string | undefined,
  teacherId: string
) => {
  const { getMessagesFromDb } = useChat();
  const [filterredMessage, setFilteredMessages] = useState<messegeData[]>([]);
  const getMessegesbyFiltered = async () => {
    const unsubscribe = getMessagesFromDb(teacherId, studentId, (messages) => {
      console.log("Filtered Messages:", messages);
      if (messages) {
        console.log(messages);
        setFilteredMessages(messages);
      }
    });
  };
  useEffect(() => {
    getMessegesbyFiltered();
  }, []);

  return filterredMessage;
};

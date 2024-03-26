import { useEffect, useState } from "react";
import { messegeData } from "../types/type.message";
import useChat from "./useChat";

export const useGetmessages = (
  studentId: string | undefined,
  teacherId: string|undefined
) => {
  const { getMessagesFromDb } = useChat();
  const [filterredMessage, setFilteredMessages] = useState<messegeData[]>([]);
  const getMessegesbyFiltered = async () => {
    getMessagesFromDb(teacherId, studentId, (messages) => {
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

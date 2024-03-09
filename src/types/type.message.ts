import { FieldValue } from "firebase/firestore";

export interface ChatRoomItem {
  message: FieldValue | string[];
  timestamp: any;
  seen?: boolean;
}

export interface messegeData {
  message: string;
  studentName?: string;
  email?: string;
  senderId: string | undefined;
  receiverId: string | undefined;
  timestamp: any;

  chatRoomId: {
    [key: string]: boolean;
  };
  chatRoom: ChatRoomItem;
}

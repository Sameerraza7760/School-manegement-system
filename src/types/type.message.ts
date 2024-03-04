import { FieldValue } from "firebase/firestore";

export interface ChatRoomItem {
  message: FieldValue | string[];
  timestamp: any;
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

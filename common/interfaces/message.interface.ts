export interface Message {
  _id: string;
  conversationId: string;
  userId: string;
  firstName: string;
  lastName: string;
  message: string;
  date: Date;
}
export interface Conversation {
  _id: string;
  members: Array<{ id: string; firstName: string; lastName: string }>;
  lastMessage: string;
  numOfMembers: number;
}

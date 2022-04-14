import { model, Schema, Document } from "mongoose";
import { Message, Conversation } from "@interfaces/message.interface";

const messageSchema: Schema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema: Schema = new Schema(
  {
    members: [{ id: String, firstName: String, lastName: String }],
    lastMessage: String,
    numOfMembers: Number,
  },
  { timestamps: true }
);

export const messageModel = model<Message & Document>("Message", messageSchema);
export const conversationModel = model<Conversation & Document>(
  "Conversation",
  conversationSchema
);

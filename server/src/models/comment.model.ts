import { model, Schema, Document } from "mongoose";
import Comment from "@interfaces/comment.interface";

const commentSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

const commentModel = model<Comment & Document>("Comment", commentSchema);

export default commentModel;

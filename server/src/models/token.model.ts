import { model, Schema, Document } from "mongoose";
import { Token } from "@interfaces/auth.interface";

const tokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const tokenModel = model<Token & Document>("Token", tokenSchema);

export default tokenModel;

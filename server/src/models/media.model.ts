import { Media, MediaTypes } from "@interfaces/media.interface";
import { PermissionLevels } from "@interfaces/permissions.enum";
import { Document, model, Schema, Types } from "mongoose";

const mediaSchema: Schema = new Schema({
  uploadUser: {
    type: Types.ObjectId,
    ref: "User",
  },

  uploadDateTime: Date,

  viewAccess: {
    type: String,
    enum: PermissionLevels,
  },
  file: Buffer,
  description: String,
  title: String,
  tags: [String],
  type: {
    type: String,
    enum: MediaTypes,
  },
});

const mediaModel = model<Media & Document>("Media", mediaSchema);

export default mediaModel;

import { PermissionLevels } from "@interfaces/permissions.enum";
import { Document, Model, model, Schema, Types } from "mongoose";
import { MediaTypes } from "@interfaces/media.interface";
import { EducationPost, PostTypes } from "@interfaces/post.interface";

const options = { discriminatorKey: "postType" };

const basePostSchema: Schema = new Schema(
  {
    postUser: {
      type: Types.ObjectId,
      ref: "User",
    },
    postDateTime: Date,
    viewAccess: {
      type: String,
      enum: PermissionLevels,
    },
    description: String,
    title: String,
    tags: [String],
    contentType: {
      type: String,
      enum: PostTypes,
    },
    comments: [String],
  },
  options
);

const textContentSchema: Schema = new Schema({
  content: {
    text: String,
  },
});

const mediaContentSchema: Schema = new Schema({
  content: {
    mediaId: {
      type: Types.ObjectId,
      ref: "Media",
    },
  },
});

const embedContentSchema: Schema = new Schema({
  content: {
    URL: String,
  },
});

export const basePostModel: Model<any> = model<EducationPost & Document>(
  "Posts",
  basePostSchema
);

export const textPostModel: Model<any> = basePostModel.discriminator(
  PostTypes.TEXT,
  textContentSchema
);
export const mediaPostModel: Model<any> = basePostModel.discriminator(
  PostTypes.MEDIA,
  mediaContentSchema
);
export const embedPostModel: Model<any> = basePostModel.discriminator(
  PostTypes.EMBED,
  embedContentSchema
);

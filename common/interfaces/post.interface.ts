import { Media, MediaTypes } from "./media.interface";
import { PermissionLevels } from "./permissions.enum";

export interface EducationPost {
  postUser: String;
  viewAccess: PermissionLevels;
  content: Media | TextContent | VideoEmbed;
  description: String;
  title: String;
  tags: [String];
  contentType: PostTypes;
  comments: [String];
}

export enum PostTypes {
  MEDIA,
  TEXT,
  EMBED,
}

export interface VideoEmbed {
  URL: String;
}
export interface TextContent {
  text: String;
}
export interface MediaContent {
  mediaId: String;
}

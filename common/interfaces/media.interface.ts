import { PermissionLevels } from "./permissions.enum";

export interface Media {
  uploadUser: String;
  // uploadDatetime: Date;
  viewAccess: PermissionLevels;
  fileUpload: Buffer;
  description: String;
  title: String;
  tags: [String];
  type: MediaTypes;
}

export enum MediaTypes {
  IMAGE,
  VIDEO,
}

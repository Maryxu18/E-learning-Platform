import { Media } from "@interfaces/media.interface";
import { PermissionLevels } from "@interfaces/permissions.enum";
import { TextContent, VideoEmbed, PostTypes } from "@interfaces/post.interface";
import {
  IsEnum,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";

export class BasePostDto {
  @IsMongoId()
  public postUser: String;

  @IsEnum(PermissionLevels)
  viewAccess: PermissionLevels;

  // @ValidateNested()
  @IsObject()
  content: TextPostDto | EmbedPostDto | VideoPostDto;

  @IsString()
  description: String;

  @IsString()
  title: String;

  // hacky but whatever. This is validated elsewhere
  @IsOptional()
  tags: [String];

  @IsEnum(PostTypes)
  contentType: PostTypes;
}

export class TextPostDto {
  @IsString()
  text: String;
}

export class EmbedPostDto {
  @IsUrl()
  URL: String;
}

export class VideoPostDto {
  @IsMongoId()
  mediaId: String;
}

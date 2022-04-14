import { MediaTypes } from "@interfaces/media.interface";
import { PermissionLevels } from "@interfaces/permissions.enum";

import { IsArray, IsDate, IsEnum, IsOptional, IsString } from "class-validator";

import { isBuffer } from "util";
import { isArrayBuffer } from "util/types";

export class CreateMediaDto {
  @IsString()
  public uploadUser;

  @IsEnum(PermissionLevels)
  public viewAccess;

  // @IsString()
  // public fileUpload;

  @IsEnum(MediaTypes)
  public type;

  @IsOptional()
  @IsString()
  public description;

  @IsString()
  public title;

  // @IsString({
  //   each: true,
  // })
  // @IsArray()
  @IsOptional()
  public tags: String[];
}

import { IsString } from "class-validator";

export default class CommentDto {
  @IsString()
  public userId: string;

  @IsString()
  public content: string;
}

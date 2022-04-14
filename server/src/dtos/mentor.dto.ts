import { IsString } from "class-validator";

export class CreateMentorDto {
  @IsString()
  public userID: string;

  @IsString()
  public aboutMe: string;

  @IsString()
  public proBackground: string;

  @IsString()
  public skills: string;

  @IsString()
  public companyName: string;

  @IsString()
  public companyDescription: string;
}

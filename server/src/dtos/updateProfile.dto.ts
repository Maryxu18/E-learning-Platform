import { IsAlpha, IsEmail, IsString } from "class-validator";

export class UpdateProfileDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsAlpha()
  public firstName: string;

  @IsAlpha()
  public lastName: string;

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

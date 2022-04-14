import { IsAlpha, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsAlpha()
  public firstName: string;

  @IsAlpha()
  public lastName: string;

  @IsString()
  public role: string;

  /* @IsString()
  public profileId: string;*/
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  public email: string;
}

export class ResetPasswordDto {
  @IsString()
  public password: string;

  @IsString()
  public confirmPassword: string;
}

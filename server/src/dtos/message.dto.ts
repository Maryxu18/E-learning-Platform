import { IsString } from "class-validator";

export class PostMessageDto {
  @IsString()
  public userId: string;

  @IsString()
  public message: string;
}

export class CreateConversationDto {
  @IsString()
  public userId: string;

  @IsString()
  public receiverId: string;
}

export class AddUserToConversationDto {
  @IsString()
  public userId: string;
}

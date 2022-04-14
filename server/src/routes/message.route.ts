import MessageController from "@/controllers/message.controller";
import {
  AddUserToConversationDto,
  CreateConversationDto,
  PostMessageDto,
} from "@/dtos/message.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class MessageRoute implements Route {
  public path = "/conversation";
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // Create a new conversation for 2 users
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(CreateConversationDto),
      this.messageController.createConversation
    );

    // Get all conversation of a user
    this.router.get(
      `${this.path}User:id`,
      this.messageController.getAllConversationOfUser
    );

    // Get all messages of conversation id
    this.router.get(
      `${this.path}:id`,
      this.messageController.getAllMessageFromConversation
    );

    // Create message in the conversation id
    this.router.post(
      `${this.path}:id/message`,
      validationMiddleware(PostMessageDto),
      this.messageController.createMessage
    );

    // Add user to existing conversation
    this.router.post(
      `${this.path}:id/addUser`,
      validationMiddleware(AddUserToConversationDto),
      this.messageController.addUserToConversation
    );

    // Delete conversation
    this.router.delete(
      `${this.path}:id`,
      this.messageController.deleteConversation
    );
  }
}

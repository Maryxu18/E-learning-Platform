import { NextFunction, Request, Response } from "express";
import {
  AddUserToConversationDto,
  CreateConversationDto,
  PostMessageDto,
} from "@/dtos/message.dto";
import {
  Message,
  Conversation,
} from "@/../../common/interfaces/message.interface";
import { messageModel, conversationModel } from "@/models/message.model";
import userModel from "@/models/users.model";
import { User } from "@interfaces/users.interface";
import { isEmpty } from "class-validator";
import HttpException from "@/exceptions/HttpException";

// No service for this. The controller handles messages directly
class MessageController {
  private conversation = conversationModel;
  private message = messageModel;
  private user = userModel;

  public createConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body: CreateConversationDto = req.body;
      const findUser1 = await this.user.findById(body.userId);
      const findUser2 = await this.user.findById(body.receiverId);
      if (!findUser1 || !findUser2)
        throw new HttpException(404, "user does not exist");

      const datenow = new Date();
      let findConversation: Conversation =
        await this.conversation.findOneAndUpdate(
          {
            $and: [
              { members: { $elemMatch: { id: findUser1._id } } },
              { members: { $elemMatch: { id: findUser2._id } } },
              { numOfMembers: 2 },
            ],
          },
          { updatedAt: datenow }
        );
      if (!findConversation) {
        findConversation = await this.conversation.create({
          members: [
            {
              id: findUser1._id,
              firstName: findUser1.firstName,
              lastName: findUser1.lastName,
            },
            {
              id: findUser2._id,
              firstName: findUser2.firstName,
              lastName: findUser2.lastName,
            },
          ],
          lastMessage: "",
          numOfMembers: 2,
        });
      }
      res
        .status(201)
        .json({ data: findConversation, message: "create new conversation" });
    } catch (error) {
      next(error);
    }
  };

  public getAllConversationOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const findUser: User = await this.user.findById(id);
      if (!findUser) throw new HttpException(404, "user does not exist");

      const findConversations: Conversation[] = await this.conversation.find({
        members: { $elemMatch: { id: findUser._id } },
      });
      res
        .status(200)
        .json({ data: findConversations, message: "find all conversations" });
    } catch (error) {
      next(error);
    }
  };

  public getAllMessageFromConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId: string = req.params.id;
      if (isEmpty(conversationId))
        throw new HttpException(400, "conversationId not specified.");

      const findConversation: Conversation = await this.conversation.findById(
        conversationId
      );
      if (!findConversation)
        throw new HttpException(404, "conversation does not exist");

      const findMessages: Message[] = await this.message.find({
        conversationId: conversationId,
      });
      res.status(200).json({
        data: findMessages,
        message: "find messages from conversation",
      });
    } catch (error) {
      next(error);
    }
  };

  public createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body: PostMessageDto = req.body;
      const findUser: User = await this.user.findById(body.userId);
      if (!findUser) throw new HttpException(404, "user does not exist");

      const conversationId: string = req.params.id;
      if (isEmpty(conversationId))
        throw new HttpException(400, "conversationId not specified.");

      const findConversation: Conversation = await this.conversation.findOne({
        $and: [
          { members: { $elemMatch: { id: findUser._id } } },
          { _id: conversationId },
        ],
      });
      if (!findConversation)
        throw new HttpException(404, "conversation does not exist");

      const newMessage: Message = await this.message.create({
        ...body,
        conversationId: conversationId,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        date: Date.now(),
      });
      const updateConversation: Conversation =
        await this.conversation.findByIdAndUpdate(conversationId, {
          lastMessage: newMessage.message,
        });

      res.status(201).json({ data: newMessage, message: "create message" });
    } catch (error) {
      next(error);
    }
  };

  public addUserToConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId: string = req.params.id;
      if (isEmpty(conversationId))
        throw new HttpException(400, "conversationId not specified.");

      const findConversation: Conversation = await this.conversation.findById(
        conversationId
      );
      if (!findConversation)
        throw new HttpException(404, "conversation does not exist");

      const body: AddUserToConversationDto = req.body;
      const findUser: User = await this.user.findById(body.userId);
      if (!findUser) throw new HttpException(404, "user does not exist");

      const updateConversation: Conversation =
        await this.conversation.findByIdAndUpdate(conversationId, {
          numOfMembers: findConversation.numOfMembers + 1,
          $push: {
            members: {
              id: findUser._id,
              firstName: findUser.firstName,
              lastName: findUser.lastName,
            },
          },
        });

      res
        .status(201)
        .json({ data: updateConversation, message: "create message" });
    } catch (error) {
      next(error);
    }
  };

  public deleteConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const conversationId = req.params.id;
      if (!conversationId)
        throw new HttpException(404, "conversationId not specified");

      const deleteConvo: Conversation =
        await this.conversation.findByIdAndDelete(conversationId);
      if (!deleteConvo)
        throw new HttpException(404, "conversation does not exist");

      //delete messages
      await this.message.deleteMany({ conversationId: conversationId });

      res.status(200).json({ data: deleteConvo, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default MessageController;

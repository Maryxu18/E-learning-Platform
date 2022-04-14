import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto";
import { User } from "@interfaces/users.interface";
import userService from "@services/users.service";

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserParticipants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllUsersData: User[] =
        await this.userService.findAllUserParticipant();
      res
        .status(200)
        .json({ data: findAllUsersData, message: "findAllParticipant" });
    } catch (error) {
      next(error);
    }
  };

  public getUserMentors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllUsersData: User[] =
        await this.userService.findAllUserMentor();

      res
        .status(200)
        .json({ data: findAllUsersData, message: "findAllMentor" });
    } catch (error) {
      next(error);
    }
  };

  public getUserPartners = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllUsersData: User[] =
        await this.userService.findAllUserPartner();

      res
        .status(200)
        .json({ data: findAllUsersData, message: "findAllPartner" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserDto = req.body;

      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: "User created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(
        userId,
        userData
      );

      res.status(200).json({ data: updateUserData, message: "User updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: "User deleted" });
    } catch (error) {
      next(error);
    }
  };
}
export default UsersController;

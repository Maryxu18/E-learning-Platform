import { Router } from "express";
import UsersController from "@controllers/users.controller";
import { CreateUserDto } from "@dtos/users.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class UsersRoute implements Route {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(
      `${this.path}/participants`,
      this.usersController.getUserParticipants
    );
    this.router.get(
      `${this.path}/mentors`,
      this.usersController.getUserMentors
    );
    this.router.get(
      `${this.path}/partners`,
      this.usersController.getUserPartners
    );
    this.router.get(`${this.path}/id:id`, this.usersController.getUserById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, "body"),
      this.usersController.createUser
    );
    this.router.put(
      `${this.path}/id:id`,
      validationMiddleware(CreateUserDto, "body", true),
      this.usersController.updateUser
    );

    this.router.delete(`${this.path}/id:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;

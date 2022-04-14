import { Router } from "express";
import MentorController from "@controllers/mentor.controller";
import { CreateMentorDto } from "@dtos/mentor.dto";
import { UpdateProfileDto } from "@dtos/updateProfile.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class MentorRoute implements Route {
  public path = "/mentors";
  public router = Router();
  public mentorController = new MentorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.mentorController.getMentors);
    this.router.get(
      `${this.path}/view-mentor-prof/id:id`,
      this.mentorController.getMentorById
    );
    this.router.post(
      `${this.path}/create-mentor-prof/id:id`,
      validationMiddleware(CreateMentorDto, "body"),
      this.mentorController.createMentor
    );
    this.router.put(
      `${this.path}/edit-mentor-prof/id:id`,
      validationMiddleware(CreateMentorDto, "body", true),
      this.mentorController.updateMentor
    );
  }
}

export default MentorRoute;

import { Router } from "express";
import ParticipantController from "@controllers/participant.controller";
import { CreateParticipantDto } from "@dtos/participant.dto";
import { UpdateProfileDto } from "@dtos/updateProfile.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class ParticipantRoute implements Route {
  public path = "/participants";
  public router = Router();
  public participantController = new ParticipantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.participantController.getParticipants);
    this.router.get(
      `${this.path}/view-participant-prof/id:id`,
      this.participantController.getParticipantById
    );
    this.router.post(
      `${this.path}/create-participant-prof/id:id`,
      validationMiddleware(CreateParticipantDto, "body"),
      this.participantController.createParticipant
    );
    this.router.put(
      `${this.path}/edit-participant-prof/id:id`,
      validationMiddleware(CreateParticipantDto, "body", true),
      this.participantController.updateParticipant
    );
  }
}

export default ParticipantRoute;

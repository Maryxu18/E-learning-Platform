import { NextFunction, Request, Response } from "express";
import { CreateParticipantDto } from "@dtos/participant.dto";
import { Participant } from "@interfaces/participant.interface";
import participantService from "@services/participant.service";

class ParticipantController {
  public participantService = new participantService();

  public getParticipants = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllParticipantsData: Participant[] =
        await this.participantService.findAllParticipants();

      res.status(200).json({
        data: findAllParticipantsData,
        message: "findAllParticipants",
      });
    } catch (error) {
      next(error);
    }
  };

  public getParticipantById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const findOneParticipantData: Participant =
        await this.participantService.findParticipantById(id);

      res
        .status(200)
        .json({ data: findOneParticipantData, message: "findOneParticipant" });
    } catch (error) {
      next(error);
    }
  };

  public createParticipant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const participantData: CreateParticipantDto = req.body;
      const createParticipantData: Participant =
        await this.participantService.createParticipant(id, participantData);

      res
        .status(201)
        .json({ data: createParticipantData, message: "created participant" });
    } catch (error) {
      next(error);
    }
  };

  public updateParticipant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const participantData: CreateParticipantDto = req.body;
      const updateParticipantData: Participant =
        await this.participantService.updateParticipant(id, participantData);

      res
        .status(200)
        .json({ data: updateParticipantData, message: "updated participant" });
    } catch (error) {
      next(error);
    }
  };

  // public deleteParticipant = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const id: string = req.params.id;
  //     const deleteParticipantData: Participant =
  //       await this.participantService.deleteParticipant(id);

  //     res
  //       .status(200)
  //       .json({ data: deleteParticipantData, message: "deleted participant" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default ParticipantController;

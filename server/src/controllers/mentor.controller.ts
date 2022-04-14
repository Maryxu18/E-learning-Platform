import { NextFunction, Request, Response } from "express";
import { CreateMentorDto } from "@dtos/mentor.dto";
import { Mentor } from "@interfaces/mentor.interface";
import mentorService from "@services/mentor.service";
import userService from "@services/users.service";
import { User } from "@interfaces/users.interface";
import HttpException from "@/exceptions/HttpException";

class MentorController {
  public mentorService = new mentorService();
  public userService = new userService();

  public getMentors = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllMentorsData: Mentor[] =
        await this.mentorService.findAllMentors();

      res.status(200).json({
        data: findAllMentorsData,
        message: "findAllMentors",
      });
    } catch (error) {
      next(error);
    }
  };

  public getMentorById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const mentorId: string = req.params.id;
      const findOneMentorData: Mentor = await this.mentorService.findMentorById(
        mentorId
      );
      // const findOneUserData: User = await this.userService.findUserById(
      //   findOneMentorData.userID
      // );

      res.status(200).json({
        data: findOneMentorData,
        message: "View Mentor Profile",
      });
    } catch (error) {
      next(error);
    }
  };

  public createMentor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const mentorData: CreateMentorDto = req.body;
      const findOneUserData: User = await this.userService.findUserById(id);
      if (!(findOneUserData.role === "mentor")) {
        throw new HttpException(400, "This user is not a mentor");
      }
      const createMentorData: Mentor = await this.mentorService.createMentor(
        id,
        mentorData
      );
      res
        .status(201)
        .json({ data: createMentorData, message: "created mentor" });
    } catch (error) {
      next(error);
    }
  };
  public updateMentor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const mentorData: CreateMentorDto = req.body;
      const updateMentorData: Mentor = await this.mentorService.updateMentor(
        id,
        mentorData
      );
      res.status(201).json({
        data: { updateMentorData },
        message: "updated mentor",
      });
    } catch (error) {
      next(error);
    }
  };
}
export default MentorController;

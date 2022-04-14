import { NextFunction, Request, Response } from "express";
import { CreatePartnerDto } from "@dtos/partner.dto";
import { Partner } from "@interfaces/partner.interface";
import partnerService from "@services/partner.service";
import userService from "@services/users.service";
import { CreateUserDto } from "@/dtos/users.dto";
import { User } from "@interfaces/users.interface";
import HttpException from "@/exceptions/HttpException";

class PartnerController {
  public partnerService = new partnerService();
  public userService = new userService();

  public getPartners = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllPartnersData: Partner[] =
        await this.partnerService.findAllPartners();

      res.status(200).json({
        data: findAllPartnersData,
        message: "findAllPartners",
      });
    } catch (error) {
      next(error);
    }
  };

  public getPartnerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const partnerId: string = req.params.id;
      const findOnePartnerData: Partner =
        await this.partnerService.findPartnerById(partnerId);
      const findOneUserData: User = await this.userService.findUserById(
        findOnePartnerData.userID
      );

      res.status(200).json({
        data: { findOnePartnerData, findOneUserData },
        message: "View Partner Profile",
      });
    } catch (error) {
      next(error);
    }
  };

  public createPartner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const partnerData: CreatePartnerDto = req.body;
      const findOneUserData: User = await this.userService.findUserById(id);
      if (!(findOneUserData.role === "partner")) {
        throw new HttpException(400, "This user is not a partner");
      }
      const createPartnerData: Partner =
        await this.partnerService.createPartner(id, partnerData);
      res
        .status(201)
        .json({ data: createPartnerData, message: "created partner" });
    } catch (error) {
      next(error);
    }
  };
  public updatePartner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const partnerData: CreatePartnerDto = req.body;
      //const userData: CreateUserDto = req.body;
      const updatePartnerData: Partner =
        await this.partnerService.updatePartner(id, partnerData);
      // const updateUserData: User = await this.userService.updateUser(
      //   updatePartnerData.userID,
      //   userData
      // );
      res
        .status(201)
        .json({ data: updatePartnerData, message: "updated partner" });
    } catch (error) {
      next(error);
    }
  };
}

export default PartnerController;

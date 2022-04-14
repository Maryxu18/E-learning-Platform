import { Router } from "express";
import PartnerController from "@controllers/partner.controller";
import { CreatePartnerDto } from "@dtos/partner.dto";
import { UpdateProfileDto } from "@dtos/updateProfile.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class PartnerRoute implements Route {
  public path = "/partners";
  public router = Router();
  public partnerController = new PartnerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.partnerController.getPartners);
    this.router.get(
      `${this.path}/view-partner-prof/id:id`,
      this.partnerController.getPartnerById
    );
    this.router.post(
      `${this.path}/create-partner-prof/id:id`,
      validationMiddleware(CreatePartnerDto, "body"),
      this.partnerController.createPartner
    );
    this.router.put(
      `${this.path}/edit-partner-prof/id:id`,
      validationMiddleware(CreatePartnerDto, "body", true),
      this.partnerController.updatePartner
    );
  }
}

export default PartnerRoute;

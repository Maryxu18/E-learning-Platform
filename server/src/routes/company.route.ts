import { Router } from "express";
import CompanyController from "@controllers/company.controller";
import { CreateCompanyDto } from "@dtos/company.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";

class CompanyRoute implements Route {
  public path = "/company";
  public router = Router();
  public companyController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.companyController.getCompanies);
    this.router.get(
      `${this.path}/id:compId`,
      this.companyController.getCompanyById
    );
    this.router.post(
      `${this.path}/create/id:id`,
      validationMiddleware(CreateCompanyDto, "body"),
      this.companyController.createCompany
    );
    this.router.put(
      `${this.path}/edit/id:compId/id:id`,
      validationMiddleware(CreateCompanyDto, "body", true),
      this.companyController.updateCompany
    );
    this.router.put(
      `${this.path}/join/id:compId/id:id`,
      this.companyController.addUser
    );

    this.router.put(
      `${this.path}/leave/id:compId/id:id`,
      this.companyController.leaveCompany
    );
    // delete route
    this.router.delete(
      `${this.path}/delete/id:compId/id:id`,
      this.companyController.deleteCompany
    );
  }
}

export default CompanyRoute;

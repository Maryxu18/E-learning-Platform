import { NextFunction, Request, Response } from "express";
import { CreateCompanyDto } from "@dtos/company.dto";
import { Company } from "@interfaces/company.interface";
import companyService from "@services/company.service";
import { User } from "@interfaces/users.interface";

class CompanyController {
  public companyService = new companyService();

  public getCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllCompaniesData: Company[] =
        await this.companyService.findAllCompanies();

      res.status(200).json({
        data: findAllCompaniesData,
        message: "Found All Companies",
      });
    } catch (error) {
      next(error);
    }
  };

  public getCompanyById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.compId;
      const findOneCompanyData: Company =
        await this.companyService.findCompanyById(id);

      res
        .status(200)
        .json({ data: findOneCompanyData, message: "Found company by id" });
    } catch (error) {
      next(error);
    }
  };

  public createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const companyData: CreateCompanyDto = req.body;
      const createCompanyData: Company =
        await this.companyService.createCompany(id, companyData);

      res
        .status(201)
        .json({ data: createCompanyData, message: "created company" });
    } catch (error) {
      next(error);
    }
  };

  public updateCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const companyId: string = req.params.compId;
      const id: string = req.params.id;
      const companyData: CreateCompanyDto = req.body;
      const updateCompanyData: Company =
        await this.companyService.updateCompany(id, companyId, companyData);

      res
        .status(200)
        .json({ data: updateCompanyData, message: "updated company" });
    } catch (error) {
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const companyId: string = req.params.compId;
      const id: string = req.params.id;
      const addCompanyMember: Company = await this.companyService.updateMember(
        id,
        companyId
      );
      res.status(201).json({
        data: addCompanyMember,
        message: "added member to the company",
      });
    } catch (error) {
      next(error);
    }
  };

  public leaveCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const companyId: string = req.params.compId;
      const userId: string = req.params.id;
      const deleteUserData: Company = await this.companyService.deleteMember(
        userId,
        companyId
      );

      res
        .status(200)
        .json({ data: deleteUserData, message: "Member left the company" });
    } catch (error) {
      next(error);
    }
  };
  public deleteCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const companyId: string = req.params.compId;
      const userId: string = req.params.id;
      const deleteCompany: Company = await this.companyService.deleteCompany(
        userId,
        companyId
      );

      res.status(200).json({ data: deleteCompany, message: "Company deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;

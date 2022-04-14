import { NextFunction, Request, Response } from "express";
import { CreateDeliverableDto } from "@dtos/deliverable.dto";
import { Deliverable } from "@interfaces/deliverable.interface";
import deliverableService from "@services/deliverable.service";

class DeliverableController {
  public deliverableService = new deliverableService();

  public getDeliverables = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const findAllDeliverablesData: Deliverable[] =
        await this.deliverableService.findAllDeliverables(id);

      res.status(200).json({
        data: findAllDeliverablesData,
        message: "Found all deliverables",
      });
    } catch (error) {
      next(error);
    }
  };

  public getDeliverableById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const delivId: string = req.params.delivId;
      const findOneDeliverableData: Deliverable =
        await this.deliverableService.findDeliverableById(delivId);

      res.status(200).json({
        data: findOneDeliverableData,
        message: "Found deliverable by id",
      });
    } catch (error) {
      next(error);
    }
  };

  public createDeliverable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      const deliverableData: CreateDeliverableDto = req.body;
      const createDeliverableData: Deliverable =
        await this.deliverableService.createDeliverable(id, deliverableData);

      res
        .status(201)
        .json({ data: createDeliverableData, message: "created deliverable" });
    } catch (error) {
      next(error);
    }
  };
}

export default DeliverableController;

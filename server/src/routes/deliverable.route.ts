import { Router } from "express";
import DeliverableController from "@controllers/deliverable.controller";
import SubmissionController from "@/controllers/submission.controller";
import {
  CreateDeliverableDto,
  GradeDeliverableDto,
} from "@dtos/deliverable.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@middlewares/validation.middleware";
import App from "@/app";
import { Multer } from "multer";

class DeliverableRoute implements Route {
  public path = "/deliverable";
  public router = Router();
  public deliverableController = new DeliverableController();
  public submissionController;
  public multer: Multer;

  public initHelpers(app: App) {
    this.multer = app.uploader;
    this.submissionController = new SubmissionController(this.multer);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/id:id`,
      this.deliverableController.getDeliverables
    );
    this.router.get(
      `${this.path}/Id:id`,
      this.deliverableController.getDeliverables
    );
    this.router.get(
      `${this.path}/id:delivId`,
      this.deliverableController.getDeliverableById
    );
    this.router.get(
      `${this.path}/delivId:delivId`,
      this.deliverableController.getDeliverableById
    );

    this.router.post(
      `${this.path}/create/id:id`,
      validationMiddleware(CreateDeliverableDto, "body"),
      this.deliverableController.createDeliverable
    );

    // submit deliverable (participant)
    this.router.post(
      `${this.path}:id/submit`,
      this.multer.single("file"),
      this.submissionController.submitDeliverable
    );

    // grade deliverable (mentor)
    this.router.put(
      `/submission:id`,
      validationMiddleware(GradeDeliverableDto, "body"),
      this.submissionController.gradeDeliverable
    );

    // view grades and feedback
    this.router.get(
      `/view-grade/id:deliverableId/id:id`,
      this.submissionController.getGrade
    );
    //get submission by id
    this.router.get(`/submission:id`, this.submissionController.getSubmission);

    //get all submissions
    this.router.get(
      "/all-submissions",
      this.submissionController.getAllSubmissions
    );

    // gets the file of the submission (to download)
    this.router.get(
      `/download/submission:id`,
      this.submissionController.getSubmissionFile
    );

    // get all submissions of deliverable id
    this.router.get(
      `${this.path}:id/submissions`,
      this.submissionController.getAllSubmissionsOfDeliverable
    );
  }
}

export default DeliverableRoute;

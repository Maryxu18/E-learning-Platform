import { NextFunction, Request, Response } from "express";
import { Deliverable } from "@interfaces/deliverable.interface";
import deliverableModel from "@/models/deliverable.model";
import Submission from "@interfaces/submission.interface";
import submissionModel from "@/models/submission.model";
import { Company } from "@interfaces/company.interface";
import companyModel from "@/models/company.model";
import { User } from "@interfaces/users.interface";
import userModel from "@/models/users.model";

import HttpException from "@/exceptions/HttpException";
import { Multer } from "multer";
import { GridFSBucket } from "mongodb";
import { GradeDeliverableDto } from "@/dtos/deliverable.dto";
import mongoose from "mongoose";

class SubmissionController {
  private company = companyModel;
  private deliverable = deliverableModel;
  private submission = submissionModel;
  private user = userModel;
  public multer: Multer;

  constructor(multer: Multer) {
    this.multer = multer;
  }

  public submitDeliverable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.file);
      const deliverableId: string = req.params.id;
      const fileId = req.file.id;
      const companyId = req.body.companyId;

      const findCompany: Company = await this.company.findById(companyId);
      if (!findCompany)
        throw new HttpException(404, "CompanyId does not exist");

      const findDeliverable: Deliverable = await this.deliverable.findById(
        deliverableId
      );
      if (!findDeliverable)
        throw new HttpException(404, "DeliverableId does not exist");

      // check if submission is late
      let onTime = true;
      const date = new Date();
      if (date > findDeliverable.dueDate) {
        onTime = false;
      }

      // check if company already submitted
      const findSubmission: Submission = await this.submission.findOne({
        companyId: companyId,
        deliverableId: deliverableId,
      });
      if (findSubmission) {
        // delete previous file
        const gfs = new GridFSBucket(mongoose.connection.db, {
          bucketName: "submissions",
        });
        gfs.delete(mongoose.Types.ObjectId(findSubmission.fileId));

        const updateSubmission = await this.submission.findByIdAndUpdate(
          findSubmission._id,
          { fileId: fileId, fileName: req.file.filename },
          { new: true }
        );
        await this.company.findByIdAndUpdate(companyId, {
          $pull: { submissions: { _id: findSubmission._id } },
        });
        await this.company.findByIdAndUpdate(companyId, {
          $push: { submissions: updateSubmission },
        });

        res.status(200).json({ data: updateSubmission, message: "updated" });
        return;
      }

      // create submission
      const createSubmission: Submission = await this.submission.create({
        companyId: companyId,
        deliverableId: deliverableId,
        fileId: fileId,
        fileName: req.file.filename,
        grade: 0,
        feedback: "",
        onTime: onTime,
        isGraded: false,
        graderId: "",
      });

      // add submission to company data
      await this.company.findByIdAndUpdate(companyId, {
        $push: { submissions: createSubmission },
      });

      res.status(201).json({ data: createSubmission, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public gradeDeliverable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: GradeDeliverableDto = req.body;
      const submissionId = req.params.id;

      const finduser: User = await this.user.findById(data.graderId);
      if (!finduser) throw new HttpException(404, "userId does not exist");

      const updateSubmission = await this.submission.findByIdAndUpdate(
        submissionId,
        {
          grade: data.grade,
          feedback: data.feedback,
          isGraded: true,
          graderId: finduser._id,
        },
        { new: true }
      );
      if (!updateSubmission)
        throw new HttpException(404, "SubmissionId does not exist");

      res.status(200).json({ data: updateSubmission, message: "graded" });
      return;
    } catch (error) {
      next(error);
    }
  };

  public getSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const submissionId = req.params.id;

      const findSubmission = await this.submission.findById(submissionId);
      if (!findSubmission)
        throw new HttpException(404, "SubmissionId does not exist");

      res.status(200).json({ data: findSubmission, message: "graded" });
      return;
    } catch (error) {
      next(error);
    }
  };

  public getAllSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findSubmissions: Submission[] = await this.submission.find();
      res
        .status(200)
        .json({ data: findSubmissions, message: "all submissions" });
      return;
    } catch (error) {
      next(error);
    }
  };

  public getSubmissionFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const submissionId = req.params.id;
      const findSubmission = await this.submission.findById(submissionId);
      if (!findSubmission)
        throw new HttpException(404, "SubmissionId does not exist");

      const gfs = new GridFSBucket(mongoose.connection.db, {
        bucketName: "submissions",
      });
      res.status(200);
      res.attachment(
        findSubmission.fileName.substring(
          findSubmission.fileName.indexOf("-") + 1
        )
      );
      gfs
        .openDownloadStream(mongoose.Types.ObjectId(findSubmission.fileId))
        .pipe(res);
    } catch (error) {
      next(error);
    }
  };

  public getAllSubmissionsOfDeliverable = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const delivearbleId = req.params.id;
      const findSubmissions: Submission[] = await this.submission.find({
        deliverableId: delivearbleId,
      });

      res.status(200).json({
        data: findSubmissions,
        message: "all submissions of deliverable",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SubmissionController;

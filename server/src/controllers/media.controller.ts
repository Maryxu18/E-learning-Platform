import { NextFunction, Request, Response } from "express";
import { CreateMediaDto } from "@dtos/media.dto";
import { Media } from "@interfaces/media.interface";
import mediaModel from "@/models/media.model";

import { isEmpty } from "class-validator";
import HttpException from "@/exceptions/HttpException";

// No service for this. The controller handles media uploading directly
class MediaController {
  private media = mediaModel;

  public getAllMedia = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const media: Media[] = await this.media.find();

      res.status(200).json({ data: media, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getMediaById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      if (isEmpty(id)) throw new HttpException(400, "ID not specified.");
      const mediaItem: Media = await this.media.findById(id);

      res.status(200).json({ data: mediaItem, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createMedia = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const media: CreateMediaDto = {
        ...req.body,
        uploadDateTime: new Date(),
        tags: req.body["tags"].split(","),
      };

      const createMediaData: Media = await this.media.create(media);

      res.status(201).json({ data: createMediaData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default MediaController;

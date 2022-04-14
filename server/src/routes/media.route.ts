import { Router } from "express";
import Route from "@interfaces/routes.interface";
import { Multer } from "multer";
import MediaController from "@/controllers/media.controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateMediaDto } from "@/dtos/media.dto";
import App from "@/app";

class MediaRoute implements Route {
  public path = "/education";

  public router = Router();
  public mediaController = new MediaController();
  public multer: Multer;

  public initHelpers(app: App) {
    this.multer = app.uploader;
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      this.multer.single("fileUpload"),
      validationMiddleware(CreateMediaDto),
      this.mediaController.createMedia
    );

    this.router.get(`${this.path}/media`, this.mediaController.getAllMedia);

    this.router.get(`${this.path}/media:id`, this.mediaController.getMediaById);
  }
}

export default MediaRoute;

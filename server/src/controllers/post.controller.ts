import { NextFunction, Request, Response } from "express";
import {
  BasePostDto,
  EmbedPostDto,
  TextPostDto,
  VideoPostDto,
} from "@dtos/post.dto";
import { EducationPost, PostTypes } from "@interfaces/post.interface";
import {
  basePostModel,
  textPostModel,
  embedPostModel,
  mediaPostModel,
} from "@/models/post.model";

import { isEmpty, validate, ValidationError } from "class-validator";
import HttpException from "@/exceptions/HttpException";
import validationMiddleware from "@/middlewares/validation.middleware";
import { plainToClass } from "class-transformer";

// No service for this. The controller handles post uploading directly
class PostController {
  private basePost = basePostModel;
  private textPost = textPostModel;
  private embedPost = embedPostModel;
  private mediaPost = mediaPostModel;

  public getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post: EducationPost[] = await this.basePost.find();

      res.status(200).json({ data: post, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = req.params.id;
      if (isEmpty(id)) throw new HttpException(400, "ID not specified.");
      const postItem: EducationPost = await this.basePost.findById(id);

      res.status(200).json({ data: postItem, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public getPostsByTag = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tag: string = req.params.tag;
      if (isEmpty(tag)) throw new HttpException(400, "tag not specified.");
      const posts: EducationPost[] = await this.basePost.find({ tags: tag });

      res.status(200).json({ data: posts, message: "findByTag" });
    } catch (error) {
      next(error);
    }
  };

  private async validatecontent(
    req: any,
    dto: any
  ): Promise<ValidationError[]> {
    const content = plainToClass(dto, req.body["content"]);
    return validate(content, {
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }

  private checkValidation(errors: ValidationError[]) {
    if (errors.length === 0) return;
    const message = errors
      .map((error: ValidationError) => Object.values(error.constraints))
      .join(", ");
    throw new HttpException(400, message);
  }

  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post: BasePostDto = {
        ...req.body,
        postDateTime: new Date(),
        tags: JSON.parse(req.body["tags"]),
      };
      let createPostData: EducationPost;
      switch (req.body["contentType"]) {
        case PostTypes[PostTypes.TEXT]:
          this.checkValidation(await this.validatecontent(req, TextPostDto));
          createPostData = await this.textPost.create(post);
          break;
        case PostTypes[PostTypes.MEDIA]:
          this.checkValidation(await this.validatecontent(req, VideoPostDto));
          createPostData = await this.mediaPost.create(post);
          break;
        case PostTypes[PostTypes.EMBED]:
          this.checkValidation(await this.validatecontent(req, EmbedPostDto));
          createPostData = await this.embedPost.create(post);
          break;
        default:
          throw new HttpException(400, "Post type not supported.");
          break;
      }

      res.status(201).json({ data: createPostData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;

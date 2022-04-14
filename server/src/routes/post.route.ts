import PostController from "@/controllers/post.controller";
import { BasePostDto } from "@/dtos/post.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

class PostRoute implements Route {
  public path = "/education";
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      `${this.path}/post`,
      validationMiddleware(BasePostDto),
      this.postController.createPost
    );

    this.router.get(`${this.path}/post`, this.postController.getAllPosts);
    this.router.get(
      `${this.path}/post/tag/:tag`,
      this.postController.getPostsByTag
    );
    this.router.get(`${this.path}/post/:id`, this.postController.getPostById);
  }
}

export default PostRoute;

import CommentController from "@/controllers/comment.controller";
import CommentDto from "@/dtos/comment.dto";
import Route from "@interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

export default class CommentRoute implements Route {
  public path = "/education/post/comment";
  public router = Router();
  public commentController = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    //Get all comments from post postId
    this.router.get(
      `${this.path}/:postId`,
      this.commentController.getAllPostComments
    );

    //Get comment by ID
    this.router.get(
      `/comment/:commentId`,
      this.commentController.getPostCommentById
    );

    //Create a comment on post postId
    this.router.post(
      `${this.path}/:postId`,
      validationMiddleware(CommentDto),
      this.commentController.createPostComment
    );

    //Delete a comment on post postId
    this.router.delete(
      `/comment/:commentId`,
      this.commentController.deletePostComment
    );
  }
}

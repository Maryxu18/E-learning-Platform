import { NextFunction, Request, Response } from "express";
import CommentDto from "@dtos/comment.dto";
import Comment from "@interfaces/comment.interface";
import commentModel from "@/models/comment.model";
import userModel from "@/models/users.model";
import { User } from "@interfaces/users.interface";
import { basePostModel } from "@/models/post.model";
import { EducationPost } from "@interfaces/post.interface";
import { isEmpty } from "class-validator";
import HttpException from "@/exceptions/HttpException";

// No service for this. The controller handles comments directly
class CommentController {
  private basePost = basePostModel;
  private comment = commentModel;
  private user = userModel;

  public getAllPostComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId: string = req.params.postId;
      if (isEmpty(postId))
        throw new HttpException(400, "postId not specified.");
      const allPostComments: Comment[] = await this.comment.find({
        postId: postId,
      });
      res
        .status(200)
        .json({ data: allPostComments, message: "findAllPostComments" });
    } catch (error) {
      next(error);
    }
  };

  public getPostCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const commentId: string = req.params.commentId;
      if (isEmpty(commentId))
        throw new HttpException(400, "commentId not specified.");
      const postComment: Comment = await this.comment.findById(commentId);
      if (!postComment) throw new HttpException(404, "comment does not exist");
      res.status(200).json({ data: postComment, message: "findOneComment" });
    } catch (error) {
      next(error);
    }
  };

  public createPostComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId: string = req.params.postId;
      const commentData: CommentDto = req.body;
      if (isEmpty(postId))
        throw new HttpException(400, "postId not specified.");
      if (isEmpty(commentData))
        throw new HttpException(400, "comment body missing");

      //check if user is valid
      const findUser: User = await this.user.findById(commentData.userId);
      if (!findUser) throw new HttpException(404, "user does not exist");

      const findPost: EducationPost = await this.basePost.findById(postId);
      if (!findPost) throw new HttpException(404, "postId does not exist");

      //create comment
      const createComment: Comment = await this.comment.create({
        ...commentData,
        postId: postId,
      });

      // add comment to post
      const updatePost: EducationPost = await this.basePost.findByIdAndUpdate(
        postId,
        { $push: { comments: createComment._id } }
      );

      res.status(201).json({ data: createComment, message: "created comment" });
    } catch (error) {
      next(error);
    }
  };

  public deletePostComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const commentId: string = req.params.commentId;
      if (isEmpty(commentId))
        throw new HttpException(400, "commentId not specified.");

      const findComment: Comment = await this.comment.findByIdAndDelete(
        commentId
      );
      if (!findComment)
        throw new HttpException(404, "commentId does not exist");

      //delete comment from post
      const deletePost: EducationPost = await this.basePost.findByIdAndUpdate(
        findComment.postId,
        { $pull: { comments: commentId } }
      );
      if (!deletePost) throw new HttpException(404, "post does not exist");

      res.status(200).json({ data: deletePost, message: "delete comment" });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentController;

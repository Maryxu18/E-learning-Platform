import { NextFunction, Request, Response } from "express";
import {
  CreateUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "@dtos/users.dto";
import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import AuthService from "@services/auth.service";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json({ data: findUser, message: "login" });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: ForgotPasswordDto = req.body;
      const forgotPasswordValid: Boolean =
        await this.authService.forgotPasswordSendLink(userData);

      res
        .setHeader("Access-Control-Allow-Origin", "http://localhost:19006")
        .status(200)
        .json({
          data: forgotPasswordValid,
          message: "password reset link sent to your email",
        });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.userId;
      const token: string = req.params.token;
      const userData: ResetPasswordDto = req.body;
      const resetPasswordValid: User = await this.authService.createNewPassword(
        userData,
        userId,
        token
      );

      res
        .setHeader("Access-Control-Allow-Origin", "*")
        .status(200)
        .json({ data: resetPasswordValid, message: "password has been reset" });
    } catch (error) {
      next(error);
    }
  };

  public resetPasswordValidToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.userId;
      const token: string = req.params.token;
      const resetPasswordValid: Boolean =
        await this.authService.checkValidToken(userId, token);

      res
        .setHeader("Access-Control-Allow-Origin", "http://localhost:19006")
        .status(200)
        .json({ valid: resetPasswordValid });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

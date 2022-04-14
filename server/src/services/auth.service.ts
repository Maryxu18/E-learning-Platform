import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import {
  CreateUserDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from "@dtos/users.dto";
import HttpException from "@exceptions/HttpException";
import {
  DataStoredInToken,
  TokenData,
  Token,
} from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import tokenModel from "@models/token.model";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import { sendEmail } from "@utils/sendEmail";

class AuthService {
  public users = userModel;
  public tokens = tokenModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `Your email ${userData.email} already exists`
      );

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(
    userData: CreateUserDto
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser)
      throw new HttpException(409, `Your email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching) throw new HttpException(409, "Wrong password");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (!findUser)
      throw new HttpException(409, `Your email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = config.get("secretKey");
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async forgotPasswordSendLink(
    userData: ForgotPasswordDto
  ): Promise<Boolean> {
    if (isEmpty(userData)) throw new HttpException(400, "Empty field");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, "Email does not exist");

    let findToken: Token = await this.tokens.findOne({ userId: findUser._id });
    if (!findToken) {
      findToken = await this.tokens.create({
        userId: findUser._id,
        token: this.createToken(findUser).token,
        createAt: Date.now(),
      });
    }

    const link = `http://localhost:19006/reset/${findUser._id}/${findToken.token}`;
    const htmlMessage = `
        <p>Hello ${findUser.firstName} ${findUser.lastName},</p>
        <p>You can use the following link to reset your password:</p>
        <a href=${link}>Reset Password</a>
        <p>This link will only be valid for one hour.</p>
        <br>
        <p>Thanks,</p>
        <p>African Impact Initiative Team</p>
    `;
    await sendEmail(findUser.email, "Password reset", htmlMessage);
    return true;
  }

  public async createNewPassword(
    userData: ResetPasswordDto,
    userId: string,
    token: string
  ): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Empty field");

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, "Email does not exist");

    if (userData.password != userData.confirmPassword)
      throw new HttpException(409, "Password does not match");

    const findToken: Token = await this.tokens.findOneAndDelete({
      userId: userId,
      token: token,
    });
    if (!findToken) throw new HttpException(409, "Invalid link or expired");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, {
      password: hashedPassword,
      new: true,
    });
    return updateUserById;
  }

  public async checkValidToken(
    userId: string,
    token: string
  ): Promise<Boolean> {
    const findToken: Token = await this.tokens.findOne({
      userId: userId,
      token: token,
    });
    if (!findToken) {
      return false;
    }
    return true;
  }
}

export default AuthService;

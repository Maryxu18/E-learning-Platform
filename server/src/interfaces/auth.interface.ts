import { Request } from "express";
import { User } from "../../../common/interfaces/users.interface";

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface Token {
  userId: string;
  token: string;
  createAt: Date;
}

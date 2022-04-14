import bcrypt from "bcrypt";
import { CreateUserDto } from "@dtos/users.dto";
import HttpException from "@exceptions/HttpException";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import { ObjectID } from "bson";
//var unhashedPassword: string = "";

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findAllUserParticipant(): Promise<User[]> {
    const participants: User[] = await this.users.find({ role: "participant" });
    return participants;
  }

  public async findAllUserMentor(): Promise<User[]> {
    const mentors: User[] = await this.users.find({ role: "mentor" });
    return mentors;
  }

  public async findAllUserPartner(): Promise<User[]> {
    const partners: User[] = await this.users.find({ role: "partner" });
    return partners;
  }

  public async findUserById(userId: string): Promise<User> {
    //console.log(unhashedPassword);
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");
    const id: ObjectID = new ObjectID(userId.toString());
    const findUser: User = await this.users.findOne({ _id: id });
    if (!findUser) throw new HttpException(409, "You're not user");

    //findUser.password = unhashedPassword;

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (
      !(
        userData.role === "participant" ||
        userData.role === "mentor" ||
        userData.role === "partner"
      )
    ) {
      throw new HttpException(
        400,
        "Property Role needs to be either participant, mentor or partner"
      );
    }

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `Your email ${userData.email} already exists`
      );
    //unhashedPassword = userData.password;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(
    userId: string,
    userData: CreateUserDto
  ): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({
        email: userData.email,
      });
      if (findUser && findUser._id != userId)
        throw new HttpException(
          409,
          `Your email ${userData.email} already exists`
        );
    }

    if (userData.password) {
      //unhashedPassword = userData.password;
      //console.log(this.unhashedPassword);
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      userData
    );
    if (!updateUserById) throw new HttpException(409, "You're not user");
    //updateUserById.password = unhashedPassword;

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;

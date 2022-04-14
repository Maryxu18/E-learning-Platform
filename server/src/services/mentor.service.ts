import { CreateMentorDto } from "@dtos/mentor.dto";
import HttpException from "@exceptions/HttpException";
import { Mentor } from "@interfaces/mentor.interface";
import mentorModel from "@models/mentor.model";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";

class MentorService {
  public mentor = mentorModel;
  public users = userModel;

  public async findAllMentors(): Promise<Mentor[]> {
    const mentors: Mentor[] = await this.mentor.find();
    return mentors;
  }

  public async findMentorById(mentorId: string): Promise<Mentor> {
    if (isEmpty(mentorId)) throw new HttpException(400, "You're not mentorId");
    const findMentor: Mentor = await this.mentor.findOne({
      userID: mentorId,
    });
    if (!findMentor) throw new HttpException(409, "You're not a mentor");

    return findMentor;
  }

  public async createMentor(
    userId: string,
    mentorData: CreateMentorDto
  ): Promise<Mentor> {
    if (isEmpty(mentorData))
      throw new HttpException(400, "You're not mentorData");

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot create mentor profile` + userId
      );
    const findMentor: Mentor = await this.mentor.findOne({
      userID: userId,
    });
    if (findMentor)
      throw new HttpException(409, `mentor profile already created`);

    const createMentorData: Mentor = await this.mentor.create({
      ...mentorData,
    });

    return createMentorData;
  }

  public async updateMentor(
    mentorId: string,
    mentorData: CreateMentorDto
  ): Promise<Mentor> {
    if (isEmpty(mentorData))
      throw new HttpException(400, "You're not a mentor");

    const updateMentorById: Mentor = await this.mentor.findByIdAndUpdate(
      mentorId,
      mentorData,
      { new: true }
    );
    if (!updateMentorById)
      throw new HttpException(409, "You're not a bloody mentor");

    return updateMentorById;
  }
}

export default MentorService;

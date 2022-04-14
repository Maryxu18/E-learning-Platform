import { CreateParticipantDto } from "@dtos/participant.dto";
import HttpException from "@exceptions/HttpException";
import { Participant } from "@interfaces/participant.interface";
import participantModel from "@models/participant.model";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";

class ParticipantService {
  public participant = participantModel;
  public users = userModel;

  public async findAllParticipants(): Promise<Participant[]> {
    const participants: Participant[] = await this.participant.find();
    return participants;
  }

  public async findParticipantById(
    participantId: string
  ): Promise<Participant> {
    if (isEmpty(participantId))
      throw new HttpException(400, "You're not participantId");
    const findParticipant: Participant = await this.participant.findOne({
      userID: participantId,
    });
    if (!findParticipant)
      throw new HttpException(409, "You're not a participant");

    return findParticipant;
  }

  public async createParticipant(
    userId: string,
    participantData: CreateParticipantDto
  ): Promise<Participant> {
    if (isEmpty(participantData))
      throw new HttpException(400, "You're not participantData");

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot create participant profile` + userId
      );
    const findParticipant: Participant = await this.participant.findOne({
      userID: userId,
    });
    if (findParticipant)
      throw new HttpException(409, `participant profile already created`);

    const createParticipantData: Participant = await this.participant.create({
      ...participantData,
    });

    return createParticipantData;
  }

  public async updateParticipant(
    participantId: string,
    participantData: CreateParticipantDto
  ): Promise<Participant> {
    if (isEmpty(participantData))
      throw new HttpException(400, "You're not a participant");

    const updateParticipantById: Participant =
      await this.participant.findByIdAndUpdate(participantId, participantData, {
        new: true,
      });
    if (!updateParticipantById)
      throw new HttpException(409, "You're not a bloody participant");

    return updateParticipantById;
  }
}

export default ParticipantService;

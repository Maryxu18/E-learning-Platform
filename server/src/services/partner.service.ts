import { CreatePartnerDto } from "@dtos/partner.dto";
import HttpException from "@exceptions/HttpException";
import { Partner } from "@interfaces/partner.interface";
import partnerModel from "@models/partner.model";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";

class PartnerService {
  public partner = partnerModel;
  public users = userModel;

  public async findAllPartners(): Promise<Partner[]> {
    const partners: Partner[] = await this.partner.find();
    return partners;
  }

  public async findPartnerById(partnerId: string): Promise<Partner> {
    if (isEmpty(partnerId))
      throw new HttpException(400, "You're not partnerId");
    const findPartner: Partner = await this.partner.findOne({
      userID: partnerId,
    });
    if (!findPartner) throw new HttpException(409, "You're not a partner");

    return findPartner;
  }

  public async createPartner(
    userId: string,
    partnerData: CreatePartnerDto
  ): Promise<Partner> {
    if (isEmpty(partnerData))
      throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot create partner profile` + userId
      );
    const findPartner: Partner = await this.partner.findOne({
      userID: userId,
    });
    if (findPartner)
      throw new HttpException(409, `partner profile already created`);

    const createPartnerData: Partner = await this.partner.create({
      ...partnerData,
    });

    return createPartnerData;
  }

  public async updatePartner(
    partnerId: string,
    partnerData: CreatePartnerDto
  ): Promise<Partner> {
    if (isEmpty(partnerData))
      throw new HttpException(400, "You're not a partner");

    const updatePartnerById: Partner = await this.partner.findByIdAndUpdate(
      partnerId,
      partnerData,
      { new: true }
    );
    if (!updatePartnerById)
      throw new HttpException(409, "You're not a bloody partner");

    return updatePartnerById;
  }
}

export default PartnerService;

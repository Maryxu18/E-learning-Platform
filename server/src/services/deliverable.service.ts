import { CreateDeliverableDto } from "@dtos/deliverable.dto";
import HttpException from "@exceptions/HttpException";
import { Deliverable } from "@interfaces/deliverable.interface";
import deliverableModel from "@models/deliverable.model";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import { Company } from "@/../../common/interfaces/company.interface";
import companyModel from "@/models/company.model";

class DeliverableService {
  public company = companyModel;
  public deliverable = deliverableModel;
  public users = userModel;

  public async findAllDeliverables(userId: string): Promise<Deliverable[]> {
    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot get deliverables `
      );

    if (!(findUser.role === "participant")) {
      throw new HttpException(400, "User needs to be a participant");
    }
    const companies: Company[] = await this.company.find();

    let findMember: User;
    for (const company of companies) {
      if (company.users.find((user) => user._id == userId)) {
        findMember = company.users.find((user) => user._id == userId);
      }
    }
    if (!findMember) {
      throw new HttpException(400, "The User is not a member of a Company");
    }
    const deliverables: Deliverable[] = await this.deliverable.find();
    return deliverables;
  }

  public async findDeliverableById(
    deliverableId: string
  ): Promise<Deliverable> {
    if (isEmpty(deliverableId))
      throw new HttpException(400, "You're not a deliverableId");
    const findDeliverable: Deliverable = await this.deliverable.findOne({
      _id: deliverableId,
    });
    if (!findDeliverable)
      throw new HttpException(409, "You're not a deliverable");

    return findDeliverable;
  }

  public async createDeliverable(
    userId: string,
    deliverableData: CreateDeliverableDto
  ): Promise<Deliverable> {
    if (isEmpty(deliverableData))
      throw new HttpException(400, "deliverable data not specified");

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot create deliverable `
      );
    if (!(findUser.role === "mentor")) {
      throw new HttpException(400, "User needs to be a mentor");
    }
    const date = Date.parse(deliverableData.dueDate);
    const createDeliverableData: Deliverable = await this.deliverable.create({
      ...deliverableData,
      createdDate: Date.now(),
      dueDate: date,
    });

    return createDeliverableData;
  }
}

export default DeliverableService;

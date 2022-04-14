import { CreateCompanyDto } from "@dtos/company.dto";
import HttpException from "@exceptions/HttpException";
import { Company } from "@interfaces/company.interface";
import companyModel from "@models/company.model";
import { User } from "@interfaces/users.interface";
import userModel from "@models/users.model";
import { isEmpty } from "@utils/util";
import { ObjectID } from "bson";

class CompanyService {
  public company = companyModel;
  public users = userModel;

  public async findAllCompanies(): Promise<Company[]> {
    const companies: Company[] = await this.company.find();
    return companies;
  }

  public async findCompanyById(companyId: string): Promise<Company> {
    if (isEmpty(companyId))
      throw new HttpException(400, "You're not companyId");
    const id: ObjectID = new ObjectID(companyId.toString());
    const findCompany: Company = await this.company.findOne({
      _id: id,
    });
    if (!findCompany) throw new HttpException(409, "You're not a company");

    return findCompany;
  }

  public async createCompany(
    userId: string,
    companyData: CreateCompanyDto
  ): Promise<Company> {
    if (isEmpty(companyData))
      throw new HttpException(400, "You're not companyData");

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. Cannot create company profile  ` + userId
      );
    if (!(findUser.role === "participant")) {
      throw new HttpException(400, "User needs to be a participant");
    }
    companyData.users = [findUser];
    companyData.founderName = findUser.firstName + " " + findUser.lastName;
    const createCompanyData: Company = await this.company.create({
      ...companyData,
      submissions: [],
    });

    return createCompanyData;
  }

  public async updateCompany(
    userId: string,
    companyId: string,
    companyData: CreateCompanyDto
  ): Promise<Company> {
    if (isEmpty(companyData))
      throw new HttpException(400, "You're not a company");

    const findCompany: Company = await this.company.findOne({
      _id: companyId,
    });
    if (!findCompany)
      throw new HttpException(
        409,
        "This company does not exist, cannot update company"
      );

    const findMember: User = findCompany.users.find(
      (user) => user._id == userId
    );
    if (!findMember) {
      throw new HttpException(400, "The User is not a member of the Company");
    }

    const updateCompanyById: Company = await this.company.findByIdAndUpdate(
      companyId,
      companyData,
      { new: true }
    );
    if (!updateCompanyById)
      throw new HttpException(409, "You're not a bloody company");

    return updateCompanyById;
  }

  public async updateMember(
    userId: string,
    companyId: string
  ): Promise<Company> {
    const findCompany: Company = await this.company.findById(companyId);
    if (!findCompany)
      throw new HttpException(
        409,
        "This company does not exist, cannot add member"
      );

    const findMember: User = findCompany.users.find(
      (user) => user._id == userId
    );
    if (findMember) {
      throw new HttpException(
        400,
        "The User is already a member of the Company"
      );
    }

    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. cannot delete user` + userId
      );
    if (!(findUser.role === "participant")) {
      throw new HttpException(400, "User needs to be a participant");
    }
    findCompany.users.push(findUser);
    const updateCompanyUsers: Company = await this.company.findByIdAndUpdate(
      companyId,
      findCompany,
      { new: true }
    );
    return updateCompanyUsers;
  }

  public async deleteMember(
    userId: string,
    companyId: string
  ): Promise<Company> {
    const findCompany: Company = await this.company.findById(companyId);
    if (!findCompany)
      throw new HttpException(
        409,
        "This company does not exist, cannot delete member"
      );
    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. cannot delete user` + userId
      );
    const userIndex = findCompany.users.findIndex((user) => user._id == userId);
    if (findCompany.users.length <= 1 && userIndex == 0) {
      const deleteCompanyById: Company = await this.company.findByIdAndDelete(
        companyId
      );
      return deleteCompanyById;
    }
    if (userIndex > -1) {
      findCompany.users.splice(userIndex, 1);
    }
    const deleteUser: Company = await this.company.findByIdAndUpdate(
      companyId,
      findCompany,
      { new: true }
    );
    if (!deleteUser)
      throw new HttpException(409, "You're not a member, cannot remove member");
    return deleteUser;
  }

  public async deleteCompany(
    userId: string,
    companyId: string
  ): Promise<Company> {
    const findCompany: Company = await this.company.findById(companyId);
    if (!findCompany)
      throw new HttpException(
        409,
        "This company does not exist, cannot delete company"
      );
    const findUser: User = await this.users.findById(userId);
    if (!findUser)
      throw new HttpException(
        409,
        `This user does not exist. User cannot delete company`
      );
    const userIndex = findCompany.users.findIndex((user) => user._id == userId);
    if (userIndex == -1) {
      throw new HttpException(
        409,
        `This user is not a member of the Company. User cannot delete company`
      );
    }
    const deleteCompany: Company = await this.company.findByIdAndDelete(
      companyId
    );
    return deleteCompany;
  }
}

export default CompanyService;

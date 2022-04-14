import { User } from "@interfaces/users.interface";
import { IsString, IsObject, IsOptional } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  public companyName: string;

  @IsOptional()
  public founderName: string;

  @IsString()
  public website: string;

  @IsString()
  public industry: string;

  @IsString()
  public companyType: string;

  @IsString()
  public aboutUs: string;

  @IsString()
  public specialties: string;

  @IsOptional()
  //({each:true})
  public users: User[];
}

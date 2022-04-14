import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateDeliverableDto {
  @IsString()
  public name: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsString()
  @IsOptional()
  public criteria: string;

  @IsString()
  public dueDate: string;
}

export class GradeDeliverableDto {
  @IsNumber()
  public grade: number;

  @IsString()
  public feedback: string;

  @IsString()
  public graderId: string;
}
